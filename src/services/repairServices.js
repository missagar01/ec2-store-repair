// services/repairService.js
import pool from "../config/postgres.js";

export const insertRepairTask = async (data) => {
  const query = `
    INSERT INTO repair_system (
      time_stamp,
      task_no,
      serial_no,
      machine_name,
      given_by,
      doer_name,
      enable_reminders,
      require_attachment,
      task_start_date,
      task_ending_date,
      problem_with_machine,
      department,
      location,
      machine_part_name,
      image_link,
      priority
    )
    VALUES (
      $1, NULL, $2, $3, $4,
      $5, $6, $7, $8, $9,
      $10, $11, $12, $13, $14, $15
    )
    RETURNING *;
  `;

  const values = [
    data.time_stamp,
    data.serial_no,
    data.machine_name,
    data.given_by,
    data.doer_name,
    data.enable_reminders,
    data.require_attachment,
    data.task_start_date,
    data.task_ending_date,
    data.problem_with_machine,
    data.department,
    data.location,
    data.machine_part_name,
    data.image_link,
    data.priority,
  ];

  const { rows } = await pool.query(query, values);
  return rows[0];
};

