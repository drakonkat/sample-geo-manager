CREATE TABLE `clienti` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`nome` text NOT NULL,
	`cognome` text NOT NULL,
	`email` text,
	`telefono` text,
	`indirizzo` text,
	`codice_fiscale` text,
	`user_id` integer,
	`created_at` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `documenti` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`nome` text NOT NULL,
	`filename` text NOT NULL,
	`mime_type` text,
	`dimensione` integer,
	`pratica_id` integer NOT NULL,
	`caricato_da` integer NOT NULL,
	`visibile_al_cliente` integer DEFAULT false NOT NULL,
	`created_at` integer,
	FOREIGN KEY (`pratica_id`) REFERENCES `pratiche`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`caricato_da`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `pratiche` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`titolo` text NOT NULL,
	`descrizione` text,
	`stato` text DEFAULT 'aperta' NOT NULL,
	`indirizzo` text,
	`foglio` text,
	`particella` text,
	`sub` text,
	`cliente_id` integer,
	`geometra_id` integer,
	`created_at` integer,
	`updated_at` integer,
	FOREIGN KEY (`cliente_id`) REFERENCES `clienti`(`id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`geometra_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` integer NOT NULL,
	`expires_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`password_hash` text NOT NULL,
	`role` text DEFAULT 'cliente' NOT NULL,
	`created_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);