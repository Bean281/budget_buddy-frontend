export interface SavingsGoal {
  id: string;
  userId: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string | null;
  completed: boolean;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  progressPercentage: number;
  daysRemaining: number | null;
}

export interface CreateSavingsGoalInput {
  name: string;
  targetAmount: number;
  currentAmount?: number;
  targetDate?: string;
  notes?: string;
}

export interface UpdateSavingsGoalInput {
  name?: string;
  targetAmount?: number;
  targetDate?: string;
  notes?: string;
}

export interface AddFundsInput {
  amount: number;
}

export interface SavingsGoalStatistics {
  goals: {
    id: string;
    name: string;
    currentAmount: number;
    targetAmount: number;
    progressPercentage: number;
    remainingAmount: number;
    targetDate: string | null;
    completed: boolean;
  }[];
  totalSaved: number;
  totalTarget: number;
  averageProgress: number;
} 