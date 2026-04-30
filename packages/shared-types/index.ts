export enum PipelineStatus {
  PENDING = "PENDING",
  RUNNING = "RUNNING",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
  ROLLING_BACK = "ROLLING_BACK",
  ROLLED_BACK = "ROLLED_BACK",
  CANCELLED = "CANCELLED"
}

export enum StepType {
  BUILD = "BUILD",
  TEST = "TEST",
  SCAN = "SCAN",
  DEPLOY = "DEPLOY",
  APPROVAL = "APPROVAL",
  NOTIFY = "NOTIFY",
  CUSTOM = "CUSTOM"
}

export interface PipelineStep {
  id: string;
  name: string;
  type: StepType;
  dependsOn: string[]; // IDs of steps this step depends on
  parallel: boolean;
  retryCount: number;
  timeoutSeconds: number;
  env: Record<string, string>;
  commands: string[];
}

export interface PipelineDAG {
  id: string;
  name: string;
  version: string;
  steps: PipelineStep[];
  governancePolicyId?: string;
}

export interface PipelineExecution {
  executionId: string;
  pipelineId: string;
  status: PipelineStatus;
  startTime: string;
  endTime?: string;
  triggeredBy: string; // e.g., "USER: Mani", "EVENT: GitHub Push"
  environment: "DEV" | "STAGING" | "PROD";
  currentStep?: string;
}

export interface PipelineKPIs {
  totalExecutions: number;
  successRate: number; // Percentage
  avgDurationSeconds: number;
  activeRollbacks: number;
  costEfficiencyScore: number;
}
