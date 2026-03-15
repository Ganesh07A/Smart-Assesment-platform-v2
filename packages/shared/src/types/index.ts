// Shared TypeScript types used across apps/web and apps/api

export type UserRole = "STUDENT" | "TEACHER" | "ADMIN";

export type ExamStatus = "DRAFT" | "PUBLISHED" | "ACTIVE" | "COMPLETED" | "ARCHIVED";

export type QuestionType = "MCQ" | "SUBJECTIVE" | "CODE" | "TRUE_FALSE" | "FILL_BLANK";

export type SubmissionStatus = "NOT_STARTED" | "IN_PROGRESS" | "SUBMITTED" | "GRADED";

// ─── User & Profile ─────────────────────────────────────────────────────────

export interface UserProfile {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  avatar?: string;
  institution?: string;
  createdAt: string;
}

// ─── Exam ────────────────────────────────────────────────────────────────────

export interface Exam {
  id: string;
  title: string;
  description: string;
  teacherId: string;
  durationMinutes: number;
  totalMarks: number;
  passingMarks: number;
  status: ExamStatus;
  startsAt?: string;
  endsAt?: string;
  instructions?: string;
  allowLateSubmission: boolean;
  shuffleQuestions: boolean;
  showResultsImmediately: boolean;
  createdAt: string;
  updatedAt: string;
  _count?: {
    questions: number;
    submissions: number;
  };
}

// ─── Question ────────────────────────────────────────────────────────────────

export interface QuestionOption {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  examId: string;
  type: QuestionType;
  content: string;
  options?: QuestionOption[];
  correctAnswer?: string; // hidden from students
  explanation?: string;
  marks: number;
  order: number;
  imageUrl?: string;
  codeTemplate?: string;
  codeLanguage?: string;
}

// Student-safe question (no answer)
export type StudentQuestion = Omit<Question, "correctAnswer" | "explanation">;

// ─── Submission & Answer ─────────────────────────────────────────────────────

export interface Answer {
  id: string;
  questionId: string;
  response: string;
  score?: number;
  aiScore?: number;
  aiFeedback?: string;
  gradedAt?: string;
}

export interface Submission {
  id: string;
  examId: string;
  studentId: string;
  status: SubmissionStatus;
  startedAt: string;
  submittedAt?: string;
  timeSpentSeconds?: number;
  answers?: Answer[];
}

// ─── Result ──────────────────────────────────────────────────────────────────

export interface ExamResult {
  id: string;
  submissionId: string;
  examId: string;
  studentId: string;
  totalScore: number;
  totalMarks: number;
  percentage: number;
  rank?: number;
  isPassed: boolean;
  gradedAt: string;
}

// ─── API Response Wrappers ───────────────────────────────────────────────────

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}
