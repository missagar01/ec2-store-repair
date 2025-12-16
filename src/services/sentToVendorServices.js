import pool from "../config/postgres.js";

// ----------------------------------------------------
// FETCH ALL TASKS
// ----------------------------------------------------
export const getAllRepairTasks = async () => {
  const query = `SELECT * FROM repair_system ORDER BY id DESC`;
  const { rows } = await pool.query(query);
  return rows;
};

// ----------------------------------------------------
// FETCH PENDING TASKS (actual_1 NULL)
// ----------------------------------------------------
export const getPendingRepairTasks = async () => {
  const query = `
        SELECT *
        FROM repair_system
        WHERE actual_1 IS NULL
        ORDER BY task_start_date ASC
    `;
  const { rows } = await pool.query(query);
  return rows;
};

// ----------------------------------------------------
// FETCH HISTORY TASKS (actual_1 NOT NULL)
// ----------------------------------------------------
export const getHistoryRepairTasks = async () => {
  const query = `
        SELECT *
        FROM repair_system
        WHERE actual_1 IS NOT NULL
        ORDER BY actual_1 DESC
    `;
  const { rows } = await pool.query(query);
  return rows;
};

// ----------------------------------------------------
// UPDATE TASK WHEN SENT
// ----------------------------------------------------
export const updateRepairTask = async (taskNo, data) => {
  const safeHowMuch =
    data.howMuch === "" || data.howMuch === null || data.howMuch === undefined
      ? null
      : Number(data.howMuch);

  const query = `
      UPDATE repair_system
      SET 
        vendor_name = $1,
        transporter_name_1 = $2,
        transportation_charges = $3,
        weighment_slip = $4,
        transporting_image_with_machine = $5,
        lead_time_to_deliver = $6,
        payment_type = $7,
        how_much = $8,
        actual_1 = NOW()
      WHERE task_no = $9
      RETURNING *;
    `;

  const values = [
    data.vendorName,
    data.transporterName,
    data.transportationCharges || null,
    data.weighmentSlip || null,
    data.transportingImageWithMachine || null,
    data.leadTimeToDeliver || null,
    data.paymentType,
    safeHowMuch,
    taskNo,
  ];

  const { rows } = await pool.query(query, values);
  return rows[0];
};
