desc __transients;
where poll_ts >= 1613303377-3600

-- poll_epoch_ns / 1000000000 (nanos)
-- 1613303377



SELECT      sort_id as item_id,
            tsminstance as tsminstance_id,
            toDateTime(toInt64(epoch_start)) start_ts,
            toDateTime(toInt64(epoch_end)) end_ts,
            TSMTIMELINE_Examined,
            TSMTIMELINE_Affected,
            TSMTIMELINE_Failed,
            TSMTIMELINE_Bytes,
            TSMTIMELINE_Idle,
            TSMTIMELINE_Mediaw,
            TSMTIMELINE_Processes,
            TSMTIMELINE_Completion_code,
            TSMTIMELINE_Comm_wait,
            TSMTIMELINE_Bytes_protected,
            TSMTIMELINE_Bytes_written,
            TSMTIMELINE_Dedup_savings,
            TSMTIMELINE_Comp_savings,
            CfgTsmTimelineActivity,
            CfgTsmTimelineActivity_details,
            CfgTsmTimelineActivity_type,
            CfgTsmTimelineNumber,
            CfgTsmTimelineEntity,
            CfgTsmTimelineAs_entity,
            CfgTsmTimelineSub_entity,
            CfgTsmTimelineCommmeth,
            CfgTsmTimelineAddress,
            CfgTsmTimelineSchedule_name,
            CfgTsmTimelineSuccessful,
            CfgTsmTimelineVolume_name,
            CfgTsmTimelineDrive_name,
            CfgTsmTimelineLibrary_name,
            CfgTsmTimelineLast_use,
            CfgTsmTimelineNum_offsite_vols,
            CfgTsmTimelineNodeName,
            CfgTsmTimelineInstance

FROM transient_tsmtimeline
WHERE poll_ts >= 1613303377-(60*60*24*14);

SELECT      sort_id as item_id,
            tsminstance as tsminstance_id,
            toDateTime(toInt64(epoch_start)) start_ts,
            toDateTime(toInt64(epoch_end)) end_ts,
            TSMTIMELINE_Examined,
            TSMTIMELINE_Affected,
            TSMTIMELINE_Failed,
            TSMTIMELINE_Bytes
FROM transient_tsmtimeline
WHERE poll_ts >= 1613303377-(60*60*24*14)
limit 10;

select count(*)
from transient_tsmtimeline
where poll_ts >= 1613303377-(60*60*24*7);

describe trend_host;