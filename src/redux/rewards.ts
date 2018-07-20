import { List } from "immutable";
import { ActionType, createStandardAction, getType } from "typesafe-actions";

import { parseRewardString } from "../rewards/parse-reward-string";
import { Reward } from "../rewards/rewards";
import { RewardSummary, summariseRewards } from "../rewards/summarise-rewards";

export const parseRewards = createStandardAction("PARSE_REWARDS")<string>();

export type RewardsActions = ActionType<typeof parseRewards>;

interface ParsedRewards {
    rewards: List<Reward>;
    rewardSummaries: List<RewardSummary>;
}

const initialState = {
    rewards: List<Reward>(),
    rewardSummaries: List<RewardSummary>()
};

const groupRewards = (rewards: List<Reward>) => {
    return rewards.groupBy(r => r.type);
};

const calculateProportion = (count: number, totalCount: number) => {
    return count / totalCount;
};

export default function reducer(state: ParsedRewards = initialState, action: RewardsActions) {
    switch (action.type) {
        case getType(parseRewards):
            const rewards = parseRewardString(action.payload);

            return {
                rewards,
                rewardSummaries: groupRewards(rewards)
                    .map((g, k) => summariseRewards(k, g.toList(), c => calculateProportion(c, rewards.count())))
                    .toList()
            };

        default:
            return state;
    }
}
