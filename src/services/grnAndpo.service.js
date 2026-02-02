// src/services/grnAndpo.service.js
import { getConnection } from "../config/db.js";
import oracledb from "../config/oracleClient.js";

/**
 * Fetches summarized GRN and PO data based on a date range.
 * @param {Date} fromDate - The start date (inclusive)
 * @param {Date} toDate - The end date (exclusive/inclusive based on logic)
 */
export async function getGrnAndPoSummary(fromDate, toDate) {
    const conn = await getConnection();
    try {
        const sql = `
      SELECT t.tcode, t.entity_code, SUM( distinct t.partybillamt) AS total_amount
      FROM view_itemtran_engine t
      WHERE t.vrdate >= :fromDate
        AND t.vrdate <= :toDate
        AND t.trantype = 'PD'
        AND t.series IN ('G3', 'PT', 'PC')
      GROUP BY t.tcode, t.entity_code
      
      UNION ALL
      
      SELECT t.tcode, t.entity_code, SUM(t.cramt) AS total_amount
      FROM view_order_engine t
      WHERE t.vrdate >= :fromDate
        AND t.vrdate <= :toDate
        AND t.series IN ('U3', 'MJ', 'MC', 'MF')
      GROUP BY t.tcode, t.entity_code
    `;

        const result = await conn.execute(
            sql,
            {
                fromDate: { val: fromDate, type: oracledb.DATE },
                toDate: { val: toDate, type: oracledb.DATE },
            },
            {
                outFormat: oracledb.OUT_FORMAT_OBJECT,
            }
        );

        return result.rows || [];
    } finally {
        await conn.close();
    }
}
