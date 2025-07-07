ALTER TABLE "loan_requests" ADD COLUMN "repayment_period" text;--> statement-breakpoint
ALTER TABLE "loan_requests" ADD COLUMN "collateral" text;--> statement-breakpoint
ALTER TABLE "loan_requests" ADD COLUMN "contact" text;--> statement-breakpoint
ALTER TABLE "loan_requests" ADD COLUMN "location" text;--> statement-breakpoint
ALTER TABLE "loan_requests" ADD COLUMN "bank_name" text;--> statement-breakpoint
ALTER TABLE "loan_requests" ADD COLUMN "bank_branch" text;--> statement-breakpoint
ALTER TABLE "loan_requests" ADD COLUMN "account_number" text;--> statement-breakpoint
ALTER TABLE "loan_requests" ADD COLUMN "guarantor_name" text;--> statement-breakpoint
ALTER TABLE "loan_requests" ADD COLUMN "guarantor_contact" text;--> statement-breakpoint
ALTER TABLE "loan_requests" ADD COLUMN "guarantor_relationship" text;