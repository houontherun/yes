#pragma once
#include "AI_Library.h"

struct NormalAICardData
{
	vector<int> cards;
	int cardtype;
	int cardval;
};

class NormalAI
{
public:
	// ---------------------------------------------------------------------------------------------------
	// -- 牌型判断
	static bool						can_press(const vector<int>& cards, int presstype, int pressval, int presslen);
	static vector<pair<int, int>>	get_cards_type(const vector<int>& cards);
	static pair<bool, int>			is_straight(const vector<int>& cards);
	static pair<bool, int>			is_consecutive_pair(const vector<int>& cards);
	static pair<bool, int>			is_aeroplane(const vector<int>& cards);
	static pair<bool, int>			is_aeroplane_small(const vector<int>& cards, int num);
	static pair<bool, int>			is_aeroplane_large(const vector<int>& cards, int num);
	static pair<bool, int>			is_four_single(const vector<int>& cards);
	static pair<bool, int>			is_four_double(const vector<int>& cards);

	// -- 提示压牌出牌
	static vector<vector<int>> get_press_tip_ways(const vector<int>& index_count, int presstype, int pressval, int presslen);
	static void get_tip_single_cards(vector<vector<int>>& ways, const vector<int>& index_count, int pressval);
	static void get_tip_pair_cards(vector<vector<int>>& ways, const vector<int>& index_count, int pressval);
	static void get_tip_trio_cards(vector<vector<int>>& ways, const vector<int>& index_count, int pressval);
	static void get_tip_trio_1_cards(vector<vector<int>>& ways, const vector<int>& index_count, int pressval);
	static void get_tip_trio_2_cards(vector<vector<int>>& ways, const vector<int>& index_count, int pressval);
	static void get_tip_straight_cards(vector<vector<int>>& ways, const vector<int>& index_count, int pressval, int len);
	static void get_tip_consecutive_pair_cards(vector<vector<int>>& ways, const vector<int>& index_count, int pressval, int len);
	static void get_tip_aeroplane_cards(vector<vector<int>>& ways, const vector<int>& index_count, int pressval, int len);
	static void get_tip_aeroplane_s_cards(vector<vector<int>>& ways, const vector<int>& index_count, int pressval, int len);
	static void get_tip_aeroplane_l_cards(vector<vector<int>>& ways, const vector<int>& index_count, int pressval, int len);
	static void get_tip_four_1_cards(vector<vector<int>>& ways, const vector<int>& index_count, int pressval);
	static void get_tip_four_2_cards(vector<vector<int>>& ways, const vector<int>& index_count, int pressval);
	static void get_tip_bomb_cards(vector<vector<int>>& ways, const vector<int>& index_count, int pressval);
	static void get_tip_nuke_cards(vector<vector<int>>& ways, const vector<int>& index_count);

	// ---------------------------------------------------------------------------------------------------
	// -- 出牌搜索
	// -- 注意 : 添加的出牌方法第一张必须为牌值 
	static void get_single_ways(vector<pair<vector<int>, int>>& ways, const vector<int>& index_count, int pressval);
	static void get_pair_ways(vector<pair<vector<int>, int>>& ways, const vector<int>& index_count, int pressval);
	static void get_trio_ways(vector<pair<vector<int>, int>>& ways, const vector<int>& index_count, int pressval);
	static void get_bomb_ways(vector<pair<vector<int>, int>>& ways, const vector<int>& index_count, int pressval);
	static void get_nuke_ways(vector<pair<vector<int>, int>>& ways, const vector<int>& index_count);
	static void get_trio_1_ways(vector<pair<vector<int>, int>>& ways, const vector<int>& index_count, int pressval);
	static void get_trio_2_ways(vector<pair<vector<int>, int>>& ways, const vector<int>& index_count, int pressval);
	static void get_straight_ways(vector<pair<vector<int>, int>>& ways, const vector<int>& index_count, int pressval, int presslen);
	static void get_consecutive_pair_ways(vector<pair<vector<int>, int>>& ways, const vector<int>& index_count, int pressval, int presslen);
	static void get_aeroplane_ways(vector<pair<vector<int>, int>>& ways, const vector<int>& index_count, int pressval, int presslen);
	static void add_aeroplanes_ways(vector<pair<vector<int>, int>>& ways, const vector<vector<int>>& combin_ways, int staval, int num);
	static void get_aeroplane_s2_ways(vector<pair<vector<int>, int>>& ways, const vector<int>& index_count, int pressval);
	static void get_aeroplane_s3_ways(vector<pair<vector<int>, int>>& ways, const vector<int>& index_count, int pressval);
	static void get_aeroplane_s4_ways(vector<pair<vector<int>, int>>& ways, const vector<int>& index_count, int pressval);
	static void add_aeroplanel_ways(vector<pair<vector<int>, int>>& ways, const vector<vector<int>>& combin_ways, int staval, int num);
	static void get_aeroplane_l2_ways(vector<pair<vector<int>, int>>& ways, const vector<int>& index_count, int pressval);
	static void get_aeroplane_l3_ways(vector<pair<vector<int>, int>>& ways, const vector<int>& index_count, int pressval);
	static void add_four1_ways(vector<pair<vector<int>, int>>& ways, const vector<vector<int>>& combin_ways, int val);
	static void get_four_1_ways(vector<pair<vector<int>, int>>& ways, const vector<int>& index_count, int pressval);
	static void add_four2_ways(vector<pair<vector<int>, int>>& ways, const vector<vector<int>>& combin_ways, int val);
	static void get_four_2_ways(vector<pair<vector<int>, int>>& ways, const vector<int>& index_count, int pressval);
	static vector<pair<vector<int>, int>> get_press_putways(const vector<int>& cards, int presstype, int pressval, int presslen);
	static vector<pair<vector<int>, int>> get_free_putways(const vector<int>& cards);

	////////////////////////////待codereview//////////////////////////////////
	static vector<int>		   get_max_putways(const vector<int>& cards);
	static vector<int>		   get_max_straight(const vector<int>& index_count);
	static vector<int>		   get_max_consecutive_pair(const vector<int>& index_count);
	static vector<int>		   get_max_aeroplane(const vector<int>& index_count);
	//////////////////////////////////////////////////////////////////////////

	// -- 分析牌面
	static void get_min_aeroplane(vector<int>& index_count, int& find_index, int& back_val);
	static void add_trio_to_aeroplane(vector<int>& index_count, int& back_val);
	static void analyse_aeroplane(vector<int>& index_count);
	static void get_min_consecutive_pair(vector<int>& index_count, int& find_index, int& back_val);
	static void add_pair_to_consecutive_pair(vector<int>& index_count, int& back_val);
	static void analyse_consecutive_pair(vector<int>& index_count);
	static void get_min_straight(vector<int>& index_count, int& find_index, int& back_val);
	static void add_single_to_straight(vector<int>& index_count, int& back_val);
	static void analyse_straight(vector<int>& index_count);
	static int	evaluate(const vector<int>& cards);

	// ---------------------------------------------------------------------------------------------------
	//	-- 获取出牌策略
	//	-- @param up_cards : 上家手牌
	//	-- @param my_cards : 自己手牌
	//	-- @param down_cards : 下家手牌
	//	-- @param landlord_index : 地主位置(0 - 上，1 - 自己，2 - 下)
	//	-- @param presstype : 压牌类型
	//	-- @param pressval : 压牌牌值
	//	-- @param presslen : 压牌长度
	//	-- @param press_index : 压牌位置(0 - 上, 1 - 自己, 2 - 下)
	//	-- @param think_time : 搜索时间
	static int						get_time();
	static NormalAICardData			make_best_way(const pair<vector<int>, int>& way, int val);
	static bool						is_bomb_or_nuke(const vector<int>& cards);
	static NormalAICardData			get_put_way(const vector<int>& up_cards, const vector<int>& my_cards, const vector<int>& down_cards, int landlord_index, int presstype, int pressval, int presslen, int press_index, int think_time);
	static int						search_val(const vector<int>& up_cards, const vector<int>& my_cards, const vector<int>& down_cards, int landlord_index, int presstype, int pressval, int presslen, int press_index, int thinkdepth, int base_score, int beta);

	////////////////////////////待codereview//////////////////////////////////
	////////////////////////////////---LUA---/////////////////////////////////
	static int						Lua_GetTypeNum(const vector<int>& cards, int cardtype);
	static bool						Lua_CanPress(const vector<int>& cards, int presstype, int pressval, int presslen);
	static vector<int>				Lua_GetMaxWays(const vector<int>& cards);
	static vector<pair<int, int>>	Lua_GetCardType(const vector<int>& cards);
	static vector<vector<int>>		Lua_GetTips(const vector<int>& cards, int presstype, int pressval, int presslen);
	static NormalAICardData			Lua_GetPutWays(const vector<int>& up_cards, const vector<int>& my_cards, const vector<int>& down_cards, int landlord_index, int presstype, int pressval, int presslen, int press_index, int think_time);
	//////////////////////////////////////////////////////////////////////////
public:
	static int m_nStartTime;
	static int m_nThinkTime;
};
