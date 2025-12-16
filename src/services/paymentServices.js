import pool from "../config/postgres.js";

// 🟡 1️⃣ GET pending payments from stage 4
export const getPendingPaymentsService = async () => {
  const query = `
    SELECT *
    FROM repair_system
    WHERE planned_4 IS NOT NULL
    AND actual_4 IS NULL
    ORDER BY id DESC;
  `;
  const result = await pool.query(query);
  return result.rows;
};

// 🟢 2️⃣ GET payment history
export const getPaymentHistoryService = async () => {
  const query = `
    SELECT *
    FROM repairfms_advance_payment
    ORDER BY id DESC;
  `;
  const result = await pool.query(query);
  return result.rows;
};

// 🔵 3️⃣ INSERT new payment (payment_no auto-generated)
export const insertPaymentService = async (data) => {
  const query = `
    INSERT INTO repairfms_advance_payment (
      repair_task_no, serial_no, machine_name,
      vendor_name, bill_no, total_bill_amount,
      payment_type, to_be_paid_amount
    ) VALUES (
      $1,$2,$3,$4,$5,$6,$7,$8
    ) RETURNING *;
  `;

  const values = [
    data.repair_task_no,
    data.serial_no,
    data.machine_name,
    data.vendor_name,
    data.bill_no,
    data.total_bill_amount,
    data.payment_type,
    data.to_be_paid_amount
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
};

