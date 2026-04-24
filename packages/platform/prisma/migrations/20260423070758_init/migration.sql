-- CreateTable
CREATE TABLE "dify_apps" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "mode" TEXT,
    "description" TEXT,
    "tags" TEXT,
    "is_enabled" INTEGER DEFAULT 1,
    "api_base" TEXT NOT NULL,
    "api_key" TEXT NOT NULL,
    "enable_answer_form" BOOLEAN NOT NULL DEFAULT false,
    "answer_form_feedback_text" TEXT,
    "enable_update_input_after_starts" BOOLEAN NOT NULL DEFAULT false,
    "opening_statement_display_mode" TEXT,
    "enable_annotation" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "dify_apps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
