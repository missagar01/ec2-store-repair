import pool from "../config/postgres.js";
import { insertRepairTask } from "../services/repairServices.js";
import { uploadToS3 } from "../middlewares/s3Upload.js";   // ✅ important

export const createRepairTask = async (req, res) => {
  try {
    let imageUrl = "";

    // 1️⃣ If file uploaded → upload to S3
    if (req.file) {
      imageUrl = await uploadToS3(req.file);
    }

    // 2️⃣ Extract remaining fields from req.body
    const {
      time_stamp,
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
      priority,
    } = req.body;

    // 3️⃣ Send data to insertRepairTask
    const result = await insertRepairTask({
      time_stamp,
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
      image_link: imageUrl,   // 👈 KEY: FINAL S3 URL
      priority,
    });

    // 4️⃣ Response
    res.status(201).json({
      success: true,
      message: "Repair task created successfully!",
      data: result,
    });

  } catch (err) {
    console.error("❌ Error creating repair task:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getAllRepairTasks = async (req, res) => {
  try {
    const query = `
      SELECT
        id,
        time_stamp,
        task_no,
        serial_no,
        machine_name,
        machine_part_name,
        given_by,
        doer_name,
        problem_with_machine,
        enable_reminders,
        require_attachment,
        task_start_date,
        task_ending_date,
        priority,
        department,
        location,
        image_link,
        status
      FROM repair_system
      ORDER BY id DESC;
    `;

    const result = await pool.query(query);
    console.log(`✅ Fetched ${result.rows.length} repair tasks from database`);

    const formatted = result.rows.map((row) => ({
      id: row.id,
      timestamp: row.time_stamp,
      taskNo: row.task_no,
      serialNo: row.serial_no,
      machineName: row.machine_name,
      machinePartName: row.machine_part_name,
      givenBy: row.given_by,
      doerName: row.doer_name,
      problem: row.problem_with_machine,
      enableReminder: row.enable_reminders,
      requireAttachment: row.require_attachment,
      taskStartDate: row.task_start_date,
      taskEndDate: row.task_ending_date,
      priority: row.priority,
      department: row.department,
      location: row.location,
      imageLink: row.image_link,
      status: row.status || "Pending",
    }));

    res.json({ success: true, tasks: formatted });

  } catch (error) {
    console.error("❌ Error fetching repair tasks:", error);
    console.error("Error details:", error.message);
    res.status(500).json({ 
      success: false, 
      error: error.message || "Internal server error",
      details: error.message 
    });
  }
};
