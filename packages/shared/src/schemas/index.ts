import { z } from "zod";

// ─── Auth / User Schemas ─────────────────────────────────────────────────────

export const UserRoleSchema = z.enum(["STUDENT", "TEACHER", "ADMIN"]);

export const RegisterSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[0-9]/, "Must contain at least one number"),
  role: UserRoleSchema.default("STUDENT"),
  institution: z.string().optional(),
});

export const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional().default(false),
});

export const ForgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const ResetPasswordSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const UpdateProfileSchema = z.object({
  name: z.string().min(2).optional(),
  avatar: z.string().url().optional(),
  institution: z.string().optional(),
});

// ─── Exam Schemas ────────────────────────────────────────────────────────────

export const ExamStatusSchema = z.enum([
  "DRAFT",
  "PUBLISHED",
  "ACTIVE",
  "COMPLETED",
  "ARCHIVED",
]);

// Base exam object (without refine) — needed so we can call .partial() / .extend()
const CreateExamBaseSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(200),
  description: z.string().max(2000).optional().default(""),
  durationMinutes: z
    .number()
    .int()
    .min(5, "Minimum 5 minutes")
    .max(480, "Maximum 8 hours"),
  passingMarks: z.number().min(0),
  startsAt: z.string().datetime().optional(),
  endsAt: z.string().datetime().optional(),
  instructions: z.string().max(5000).optional(),
  allowLateSubmission: z.boolean().default(false),
  shuffleQuestions: z.boolean().default(false),
  showResultsImmediately: z.boolean().default(true),
});

export const CreateExamSchema = CreateExamBaseSchema.refine(
  (data) => {
    if (data.startsAt && data.endsAt) {
      return new Date(data.endsAt) > new Date(data.startsAt);
    }
    return true;
  },
  { message: "End time must be after start time", path: ["endsAt"] }
);

export const UpdateExamSchema = CreateExamBaseSchema.partial().extend({
  status: ExamStatusSchema.optional(),
});


// ─── Question Schemas ────────────────────────────────────────────────────────

export const QuestionTypeSchema = z.enum([
  "MCQ",
  "SUBJECTIVE",
  "CODE",
  "TRUE_FALSE",
  "FILL_BLANK",
]);

export const QuestionOptionSchema = z.object({
  id: z.string(),
  text: z.string().min(1),
});

export const CreateQuestionSchema = z.object({
  type: QuestionTypeSchema,
  content: z.string().min(1, "Question content is required"),
  marks: z.number().min(1, "Marks must be at least 1"),
  order: z.number().int().min(0),
  options: z.array(QuestionOptionSchema).optional(),
  correctAnswer: z.string().optional(),
  explanation: z.string().optional(),
  imageUrl: z.string().url().optional(),
  codeTemplate: z.string().optional(),
  codeLanguage: z.string().optional(),
});

// ─── Submission Schemas ───────────────────────────────────────────────────────

export const SubmitAnswerSchema = z.object({
  questionId: z.string().uuid(),
  response: z.string(),
});

export const SubmitExamSchema = z.object({
  submissionId: z.string().uuid(),
  answers: z.array(SubmitAnswerSchema),
  timeSpentSeconds: z.number().int().min(0),
});

// ─── Pagination Schemas ───────────────────────────────────────────────────────

export const PaginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
});

// ─── Type Inference ───────────────────────────────────────────────────────────

export type RegisterInput = z.infer<typeof RegisterSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;
export type ForgotPasswordInput = z.infer<typeof ForgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof ResetPasswordSchema>;
export type UpdateProfileInput = z.infer<typeof UpdateProfileSchema>;
export type CreateExamInput = z.infer<typeof CreateExamSchema>;
export type UpdateExamInput = z.infer<typeof UpdateExamSchema>;
export type CreateQuestionInput = z.infer<typeof CreateQuestionSchema>;
export type SubmitExamInput = z.infer<typeof SubmitExamSchema>;
export type PaginationInput = z.infer<typeof PaginationSchema>;
