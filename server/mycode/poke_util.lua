---
--- Created by admin.
--- DateTime: 2017/10/26 15:47
---

-- 根据C++代码，
-- 1~13表示黑桃3, 4, 5, ..., 10, J, Q, K, A, 2,
-- 14~26表示红桃3, 4, 5, ..., 10, J, Q, K, A, 2,
-- 27~39表示梅花3, 4, 5, ..., 10, J, Q, K, A, 2,
-- 40~52表示方块3, 4, 5, ..., 10, J, Q, K, A, 2,
-- 53, 54表示小王、大王

local function get_card_value(e)
    -- 根据牌的大小，返回[1, 15]
    if e < 53 then
        return (e -1) % 13 + 1
    else
        return e - (53 - 14)
    end
end

local function get_card_color(e)
    if e < 53 then
        return (e-1)/13 + 1
    else
        return e - (53 - 5)
    end
end

return {
    get_card_value = get_card_value,
    get_card_color = get_card_color
}