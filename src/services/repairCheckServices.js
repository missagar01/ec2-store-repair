// services/repairCheckService.js
import pool from "../config/postgres.js";

/**
 * FETCH ALL TASKS
 */
export const getAllCheckTasks = async () => {
  const query = `
    SELECT *
    FROM repair_system
    ORDER BY id DESC;
  `;
  const { rows } = await pool.query(query);
  return rows;
};

/**
 * FETCH PENDING (planned_2 exists but actual_2 is NULL)
 */
export const getPendingCheckTasks = async () => {
  const query = `
    SELECT *
    FROM repair_system
    WHERE planned_2 IS NOT NULL AND actual_2 IS NULL
    ORDER BY planned_2 ASC;
  `;
  const { rows } = await pool.query(query);
  return rows;
};

/**
 * FETCH HISTORY (actual_2 NOT NULL)
 */
export const getHistoryCheckTasks = async () => {
  const query = `
    SELECT *
    FROM repair_system
    WHERE actual_2 IS NOT NULL
    ORDER BY actual_2 DESC;
  `;
  const { rows } = await pool.query(query);
  return rows;
};

/**
 * UPDATE MATERIAL CHECK
 */
export const updateMaterialCheck = async (taskNo, data) => {
  const query = `
    UPDATE repair_system
    SET
      actual_2 = NOW(),
      transporter_name_2 = $1,
      transportation_amount = $2,
      bill_image = $3,
      bill_no = $4,
      type_of_bill = $5,
      total_bill_amount = $6,
      to_be_paid_amount = $7
    WHERE task_no = $8
    RETURNING *;
  `;

  const values = [
    data.transporterName,
    data.transportationAmount,
    data.billImage,
    data.billNo,
    data.typeOfBill,
    data.totalBillAmount,
    data.toBePaidAmount,
    taskNo
  ];

  const { rows } = await pool.query(query, values);
  return rows[0];
};
