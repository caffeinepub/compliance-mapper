import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Nat "mo:core/Nat";
import Float "mo:core/Float";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  module Standard {
    public type Standard = {
      #IEC62443;
      #NIST_CSF;
      #ISO27001;
      #SOC2;
      #CMMC;
      #NERC_CIP;
    };
  };
  module ControlFamily {
    public type ControlFamily = {
      #Access_Control;
      #Asset_Management;
      #Cryptography;
      #Security_Assessment;
      #Communications_Security;
      #Operations_Security;
      #Physical_Security;
      #Continuous_Monitoring;
    };
  };
  module ControlStatus {
    public type ControlStatus = {
      #Compliant;
      #Partial;
      #NonCompliant;
      #NotApplicable;
    };
  };
  module EvidenceType {
    public type EvidenceType = {
      #Document;
      #Screenshot;
      #Log;
      #Policy;
    };
  };
  module EvidenceStatus {
    public type EvidenceStatus = {
      #Active;
      #Expired;
      #Pending;
    };
  };
  module TaskPriority {
    public type TaskPriority = {
      #High;
      #Medium;
      #Low;
    };
  };
  module TaskStatus {
    public type TaskStatus = {
      #Open;
      #InProgress;
      #Completed;
      #OnHold;
    };
  };

  public type ComplianceControl = {
    id : Text;
    description : Text;
    family : ControlFamily.ControlFamily;
    standard : Standard.Standard;
  };

  public type CrosswalkMapping = {
    sourceStandard : Standard.Standard;
    sourceControlId : Text;
    targetStandard : Standard.Standard;
    targetControlId : Text;
  };

  public type Assessment = {
    id : Text;
    user : Principal;
    standard : Standard.Standard;
    controlsStatus : [(Text, ControlStatus.ControlStatus)];
    createdAt : Time.Time;
    lastUpdated : Time.Time;
  };

  public type PersistentAssessment = {
    id : Text;
    user : Principal;
    standard : Standard.Standard;
    controlsStatus : Map.Map<Text, ControlStatus.ControlStatus>;
    createdAt : Time.Time;
    lastUpdated : Time.Time;
  };

  public type EvidenceRecord = {
    id : Text;
    controlId : Text;
    standard : Standard.Standard;
    name : Text;
    evidenceType : EvidenceType.EvidenceType;
    status : EvidenceStatus.EvidenceStatus;
    expiryDate : ?Time.Time;
    notes : Text;
    linkedAssessmentId : ?Text;
    createdAt : Time.Time;
    createdBy : Principal;
  };

  public type ImplementationTask = {
    id : Text;
    controlId : Text;
    standard : Standard.Standard;
    title : Text;
    description : Text;
    priority : TaskPriority.TaskPriority;
    status : TaskStatus.TaskStatus;
    linkedAssessmentId : ?Text;
    createdAt : Time.Time;
    createdBy : Principal;
  };

  public type ComplianceReport = {
    standard : Standard.Standard;
    totalControls : Nat;
    compliantCount : Nat;
    partialCount : Nat;
    nonCompliantCount : Nat;
    notApplicableCount : Nat;
    compliancePercentage : Float;
  };

  public type UserProfile = {
    name : Text;
    organization : Text;
    role : Text;
  };

  module ImplementationTask {
    public func compareByPriority(a : ImplementationTask, b : ImplementationTask) : Order.Order {
      switch (a.priority, b.priority) {
        case (#High, #Medium) { #less };
        case (#High, #Low) { #less };
        case (#High, #High) { Text.compare(a.id, b.id) };
        case (#Medium, #Low) { #less };
        case (#Medium, #Medium) { Text.compare(a.id, b.id) };
        case (#Low, #Low) { Text.compare(a.id, b.id) };
        case (_) { #greater };
      };
    };
  };

  let complianceControls = Map.empty<Text, ComplianceControl>();
  var crosswalkMappings = List.empty<CrosswalkMapping>();
  let assessments = Map.empty<Text, PersistentAssessment>();
  let evidenceRecords = Map.empty<Text, EvidenceRecord>();
  let implementationTasks = Map.empty<Text, ImplementationTask>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  var nextAssessmentId : Nat = 0;
  var nextEvidenceId : Nat = 0;
  var nextTaskId : Nat = 0;

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Compliance Controls - Read operations (user+)
  public query ({ caller }) func getComplianceControl(controlId : Text) : async ComplianceControl {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view compliance controls");
    };
    switch (complianceControls.get(controlId)) {
      case (null) { Runtime.trap("Control not found") };
      case (?control) { control };
    };
  };

  public query ({ caller }) func getAllComplianceControls() : async [ComplianceControl] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view compliance controls");
    };
    complianceControls.values().toArray();
  };

  public query ({ caller }) func getControlsByStandard(standard : Standard.Standard) : async [ComplianceControl] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view compliance controls");
    };
    complianceControls.values().toArray().filter(func(control) { control.standard == standard });
  };

  // Compliance Controls - Admin operations
  public shared ({ caller }) func addComplianceControl(control : ComplianceControl) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add compliance controls");
    };
    complianceControls.add(control.id, control);
  };

  public shared ({ caller }) func updateComplianceControl(control : ComplianceControl) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update compliance controls");
    };
    complianceControls.add(control.id, control);
  };

  public shared ({ caller }) func deleteComplianceControl(controlId : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete compliance controls");
    };
    complianceControls.remove(controlId);
  };

  // Crosswalk Mappings - Read operations (user+)
  public query ({ caller }) func getCrosswalkMappings(sourceStandard : Standard.Standard, targetStandard : Standard.Standard) : async [CrosswalkMapping] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view crosswalk mappings");
    };
    crosswalkMappings.toArray().filter(
      func(mapping) {
        mapping.sourceStandard == sourceStandard and mapping.targetStandard == targetStandard
      }
    );
  };

  public query ({ caller }) func getAllCrosswalkMappings() : async [CrosswalkMapping] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view crosswalk mappings");
    };
    crosswalkMappings.toArray();
  };

  // Crosswalk Mappings - Admin operations
  public shared ({ caller }) func addCrosswalkMapping(mapping : CrosswalkMapping) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add crosswalk mappings");
    };
    crosswalkMappings.add(mapping);
  };

  public shared ({ caller }) func deleteCrosswalkMapping(sourceStandard : Standard.Standard, sourceControlId : Text, targetStandard : Standard.Standard, targetControlId : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete crosswalk mappings");
    };
    crosswalkMappings := crosswalkMappings.filter(
      func(mapping : CrosswalkMapping) : Bool {
        not (mapping.sourceStandard == sourceStandard and mapping.sourceControlId == sourceControlId and mapping.targetStandard == targetStandard and mapping.targetControlId == targetControlId)
      }
    );
  };

  // Assessments - Read operations (user+ with ownership check)
  public query ({ caller }) func getAssessment(assessmentId : Text) : async Assessment {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view assessments");
    };
    switch (assessments.get(assessmentId)) {
      case (null) { Runtime.trap("Assessment not found") };
      case (?assessment) {
        if (assessment.user != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only view your own assessments");
        };
        {
          id = assessment.id;
          user = assessment.user;
          standard = assessment.standard;
          controlsStatus = assessment.controlsStatus.toArray();
          createdAt = assessment.createdAt;
          lastUpdated = assessment.lastUpdated;
        };
      };
    };
  };

  public query ({ caller }) func getUserAssessments(user : Principal) : async [Assessment] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view assessments");
    };
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own assessments");
    };
    let filtered = assessments.values().toArray().filter(
      func(assessment) { assessment.user == user }
    );
    filtered.map(
      func(assessment) {
        {
          id = assessment.id;
          user = assessment.user;
          standard = assessment.standard;
          controlsStatus = assessment.controlsStatus.toArray();
          createdAt = assessment.createdAt;
          lastUpdated = assessment.lastUpdated;
        };
      }
    );
  };

  public query ({ caller }) func getAllAssessments() : async [Assessment] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all assessments");
    };
    assessments.values().toArray().map(
      func(assessment) {
        {
          id = assessment.id;
          user = assessment.user;
          standard = assessment.standard;
          controlsStatus = assessment.controlsStatus.toArray();
          createdAt = assessment.createdAt;
          lastUpdated = assessment.lastUpdated;
        };
      }
    );
  };

  // Assessments - Write operations (user+)
  public shared ({ caller }) func createAssessment(standard : Standard.Standard) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create assessments");
    };
    let id = "assessment-" # nextAssessmentId.toText();
    nextAssessmentId += 1;
    let now = Time.now();
    let assessment : PersistentAssessment = {
      id = id;
      user = caller;
      standard = standard;
      controlsStatus = Map.empty<Text, ControlStatus.ControlStatus>();
      createdAt = now;
      lastUpdated = now;
    };
    assessments.add(id, assessment);
    id;
  };

  public shared ({ caller }) func updateAssessmentControlStatus(assessmentId : Text, controlId : Text, status : ControlStatus.ControlStatus) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update assessments");
    };
    switch (assessments.get(assessmentId)) {
      case (null) { Runtime.trap("Assessment not found") };
      case (?assessment) {
        if (assessment.user != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only update your own assessments");
        };
        assessment.controlsStatus.add(controlId, status);
        let updatedAssessment = {
          id = assessment.id;
          user = assessment.user;
          standard = assessment.standard;
          controlsStatus = assessment.controlsStatus;
          createdAt = assessment.createdAt;
          lastUpdated = Time.now();
        };
        assessments.add(assessmentId, updatedAssessment);
      };
    };
  };

  public shared ({ caller }) func deleteAssessment(assessmentId : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can delete assessments");
    };
    switch (assessments.get(assessmentId)) {
      case (null) { Runtime.trap("Assessment not found") };
      case (?assessment) {
        if (assessment.user != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only delete your own assessments");
        };
        assessments.remove(assessmentId);
      };
    };
  };

  // Evidence Records - Read operations (user+)
  public query ({ caller }) func getEvidenceRecord(evidenceId : Text) : async EvidenceRecord {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view evidence records");
    };
    switch (evidenceRecords.get(evidenceId)) {
      case (null) { Runtime.trap("Evidence record not found") };
      case (?record) { record };
    };
  };

  public query ({ caller }) func getAllEvidenceRecords() : async [EvidenceRecord] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view evidence records");
    };
    evidenceRecords.values().toArray();
  };

  public query ({ caller }) func getEvidenceByStandard(standard : Standard.Standard) : async [EvidenceRecord] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view evidence records");
    };
    evidenceRecords.values().toArray().filter(
      func(record) { record.standard == standard }
    );
  };

  public query ({ caller }) func getEvidenceByControl(controlId : Text) : async [EvidenceRecord] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view evidence records");
    };
    evidenceRecords.values().toArray().filter(
      func(record) { record.controlId == controlId }
    );
  };

  // Evidence Records - Write operations (user+)
  public shared ({ caller }) func createEvidenceRecord(
    controlId : Text,
    standard : Standard.Standard,
    name : Text,
    evidenceType : EvidenceType.EvidenceType,
    status : EvidenceStatus.EvidenceStatus,
    expiryDate : ?Time.Time,
    notes : Text,
    linkedAssessmentId : ?Text
  ) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create evidence records");
    };
    let id = "evidence-" # nextEvidenceId.toText();
    nextEvidenceId += 1;
    let record : EvidenceRecord = {
      id = id;
      controlId = controlId;
      standard = standard;
      name = name;
      evidenceType = evidenceType;
      status = status;
      expiryDate = expiryDate;
      notes = notes;
      linkedAssessmentId = linkedAssessmentId;
      createdAt = Time.now();
      createdBy = caller;
    };
    evidenceRecords.add(id, record);
    id;
  };

  public shared ({ caller }) func updateEvidenceRecord(
    evidenceId : Text,
    name : Text,
    evidenceType : EvidenceType.EvidenceType,
    status : EvidenceStatus.EvidenceStatus,
    expiryDate : ?Time.Time,
    notes : Text
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update evidence records");
    };
    switch (evidenceRecords.get(evidenceId)) {
      case (null) { Runtime.trap("Evidence record not found") };
      case (?record) {
        if (record.createdBy != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only update your own evidence records");
        };
        let updatedRecord = {
          id = record.id;
          controlId = record.controlId;
          standard = record.standard;
          name = name;
          evidenceType = evidenceType;
          status = status;
          expiryDate = expiryDate;
          notes = notes;
          linkedAssessmentId = record.linkedAssessmentId;
          createdAt = record.createdAt;
          createdBy = record.createdBy;
        };
        evidenceRecords.add(evidenceId, updatedRecord);
      };
    };
  };

  public shared ({ caller }) func deleteEvidenceRecord(evidenceId : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can delete evidence records");
    };
    switch (evidenceRecords.get(evidenceId)) {
      case (null) { Runtime.trap("Evidence record not found") };
      case (?record) {
        if (record.createdBy != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only delete your own evidence records");
        };
        evidenceRecords.remove(evidenceId);
      };
    };
  };

  // Implementation Tasks - Read operations (user+)
  public query ({ caller }) func getImplementationTask(taskId : Text) : async ImplementationTask {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view implementation tasks");
    };
    switch (implementationTasks.get(taskId)) {
      case (null) { Runtime.trap("Task not found") };
      case (?task) { task };
    };
  };

  public query ({ caller }) func getAllImplementationTasks() : async [ImplementationTask] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view implementation tasks");
    };
    implementationTasks.values().toArray();
  };

  public query ({ caller }) func getTasksByStandard(standard : Standard.Standard) : async [ImplementationTask] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view implementation tasks");
    };
    implementationTasks.values().toArray().filter(
      func(task) { task.standard == standard }
    );
  };

  public query ({ caller }) func getTasksByPriority(priority : TaskPriority.TaskPriority) : async [ImplementationTask] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view implementation tasks");
    };
    implementationTasks.values().toArray().filter(
      func(task) { task.priority == priority }
    );
  };

  public query ({ caller }) func getTasksByPrioritySorted() : async [ImplementationTask] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view implementation tasks");
    };
    implementationTasks.values().toArray().sort(
      ImplementationTask.compareByPriority
    );
  };

  // Implementation Tasks - Write operations (user+)
  public shared ({ caller }) func createImplementationTask(
    controlId : Text,
    standard : Standard.Standard,
    title : Text,
    description : Text,
    priority : TaskPriority.TaskPriority,
    linkedAssessmentId : ?Text
  ) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create implementation tasks");
    };
    let id = "task-" # nextTaskId.toText();
    nextTaskId += 1;
    let task : ImplementationTask = {
      id = id;
      controlId = controlId;
      standard = standard;
      title = title;
      description = description;
      priority = priority;
      status = #Open;
      linkedAssessmentId = linkedAssessmentId;
      createdAt = Time.now();
      createdBy = caller;
    };
    implementationTasks.add(id, task);
    id;
  };

  public shared ({ caller }) func updateImplementationTask(
    taskId : Text,
    title : Text,
    description : Text,
    priority : TaskPriority.TaskPriority,
    status : TaskStatus.TaskStatus
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update implementation tasks");
    };
    switch (implementationTasks.get(taskId)) {
      case (null) { Runtime.trap("Task not found") };
      case (?task) {
        if (task.createdBy != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only update your own implementation tasks");
        };
        let updatedTask = {
          id = task.id;
          controlId = task.controlId;
          standard = task.standard;
          title = title;
          description = description;
          priority = priority;
          status = status;
          linkedAssessmentId = task.linkedAssessmentId;
          createdAt = task.createdAt;
          createdBy = task.createdBy;
        };
        implementationTasks.add(taskId, updatedTask);
      };
    };
  };

  public shared ({ caller }) func deleteImplementationTask(taskId : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can delete implementation tasks");
    };
    switch (implementationTasks.get(taskId)) {
      case (null) { Runtime.trap("Task not found") };
      case (?task) {
        if (task.createdBy != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only delete your own implementation tasks");
        };
        implementationTasks.remove(taskId);
      };
    };
  };

  // Reports - Read operations (user+)
  public query ({ caller }) func getComplianceReport(standard : Standard.Standard) : async ComplianceReport {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view compliance reports");
    };

    let standardControls = complianceControls.values().toArray().filter(
      func(control) { control.standard == standard }
    );
    let totalControls = standardControls.size();

    var compliantCount = 0;
    var partialCount = 0;
    var nonCompliantCount = 0;
    var notApplicableCount = 0;

    for (assessment in assessments.values()) {
      if (assessment.standard == standard) {
        for ((controlId, status) in assessment.controlsStatus.entries()) {
          switch (status) {
            case (#Compliant) { compliantCount += 1 };
            case (#Partial) { partialCount += 1 };
            case (#NonCompliant) { nonCompliantCount += 1 };
            case (#NotApplicable) { notApplicableCount += 1 };
          };
        };
      };
    };

    let compliancePercentage = if (totalControls > 0) {
      ((compliantCount + partialCount) * 100).toFloat() / totalControls.toFloat();
    } else {
      0.0;
    };

    {
      standard = standard;
      totalControls = totalControls;
      compliantCount = compliantCount;
      partialCount = partialCount;
      nonCompliantCount = nonCompliantCount;
      notApplicableCount = notApplicableCount;
      compliancePercentage = compliancePercentage;
    };
  };

  public query ({ caller }) func getRecentAssessmentActivity(limit : Nat) : async [Assessment] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view assessment activity");
    };

    let allAssessments = if (AccessControl.isAdmin(accessControlState, caller)) {
      assessments.values().toArray();
    } else {
      assessments.values().toArray().filter(func(a) { a.user == caller });
    };

    let sorted = allAssessments.sort(
      func(a : PersistentAssessment, b : PersistentAssessment) : Order.Order {
        if (a.lastUpdated > b.lastUpdated) { #less } else if (a.lastUpdated < b.lastUpdated) { #greater } else { #equal };
      }
    );

    let limitedSize = if (sorted.size() < limit) { sorted.size() } else { limit };
    Array.tabulate<Assessment>(
      limitedSize,
      func(i) {
        let assessment = sorted[i];
        {
          id = assessment.id;
          user = assessment.user;
          standard = assessment.standard;
          controlsStatus = assessment.controlsStatus.toArray();
          createdAt = assessment.createdAt;
          lastUpdated = assessment.lastUpdated;
        };
      },
    );
  };

  public query ({ caller }) func getEvidenceCoverageSummary() : async [(Standard.Standard, Nat)] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view evidence coverage");
    };

    let standards : [Standard.Standard] = [#IEC62443, #NIST_CSF, #ISO27001, #SOC2, #CMMC, #NERC_CIP];

    standards.map<Standard.Standard, (Standard.Standard, Nat)>(
      func(standard) {
        let count = evidenceRecords.values().toArray().filter(
          func(record) { record.standard == standard }
        ).size();
        (standard, count);
      }
    );
  };
};
