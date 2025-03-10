/*
  Warnings:

  - A unique constraint covering the columns `[patientId,doctorId,date]` on the table `Appointment` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Appointment_patientId_doctorId_date_key" ON "Appointment"("patientId", "doctorId", "date");
