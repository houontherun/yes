#pragma once
#include "AI_Normal.h"

struct FavusAICardData
{
	vector<int> cards;
	int cardtype;
	int cardval;
	vector<int> favuscards;
};

struct FavusCardData
{
	int cardtype;
	int cardval;
	vector<int> favuscards;
};

class FavusAI
{
public:
	// ---------------------------------------------------------------------------------------------------
	// -- 牌型判断
	static bool						can_press(const vector<int>& cards, int presstype, int pressval, int presslen, int favus);
	static vector<FavusCardData>	get_cards_type(const vector<int>& cards, int favus);
	static vector<FavusCardData>	get_favus_cards_type(const vector<int>& cards, int favus, int favus_count);
	static void						addFavusCardData(vector<FavusCardData>& the_data, int cardtype, int cardval, const vector<int>& fcards);
	static void						add_straight_type(vector<FavusCardData>& the_data, const vector<int>& cards, int favus_count);
	static void						add_consecutive_pair_type(vector<FavusCardData>& the_data, const vector<int>& cards, int favus_count);
	static void						add_aeroplane_type(vector<FavusCardData>& the_data, const vector<int>& cards, int favus_count);
	static void						add_aeroplane_small_type(vector<FavusCardData>& the_data, const vector<int>& cards, int favus_count, int num);
	static void						add_aeroplane_large_type(vector<FavusCardData>& the_data, const vector<int>& cards, int favus_count, int num);
	static void						add_four_single_type(vector<FavusCardData>& the_data, const vector<int>& cards, int favus, int favus_count);
	static void						add_four_double_type(vector<FavusCardData>& the_data, const vector<int>& cards, int favus, int favus_count);

	// -- 提示压牌出牌
	static vector<vector<int>> get_press_tip_ways(const vector<int>& cards, int presstype, int pressval, int presslen, int favus);
	static void get_tip_single_cards(vector<vector<int>>& ways, const vector<int>& index_count, int pressval, int favus, int favus_count, bool havebomb);
	static void get_tip_pair_cards(vector<vector<int>>& ways, const vector<int>& index_count, int pressval, int favus, int favus_count, bool havebomb);
	static void get_tip_trio_cards(vector<vector<int>>& ways, const vector<int>& index_count, int pressval, int favus, int favus_count, bool havebomb);
	static void get_tip_trio_1_cards(vector<vector<int>>& ways, const vector<int>& index_count, int pressval, int favus, int favus_count, bool havebomb);
	static void get_tip_trio_2_cards(vector<vector<int>>& ways, const vector<int>& index_count, int pressval, int favus, int favus_count, bool havebomb);
	static void get_tip_straight_cards(vector<vector<int>>& ways, const vector<int>& index_count, int pressval, int len, int favus, int favus_count);
	static void get_tip_consecutive_pair_cards(vector<vector<int>>& ways, const vector<int>& index_count, int pressval, int len, int favus, int favus_count);
	static void get_tip_aeroplane_cards(vector<vector<int>>& ways, const vector<int>& index_count, int pressval, int len, int favus, int favus_count);
	static void get_tip_aeroplane_s_cards(vector<vector<int>>& ways, const vector<int>& index_count, int pressval, int len, int favus, int favus_count);
	static void get_tip_aeroplane_l_cards(vector<vector<int>>& ways, const vector<int>& index_count, int pressval, int len, int favus, int favus_count);
	static void get_tip_four_1_cards(vector<vector<int>>& ways, const vector<int>& index_count, int pressval, int favus, int favus_count);
	static void get_tip_four_2_cards(vector<vector<int>>& ways, const vector<int>& index_count, int pressval, int favus, int favus_count);
	static void get_tip_favus_bomb_cards(vector<vector<int>>& ways, const vector<int>& index_count, int pressval, int favus, int favus_count);
	static void get_tip_all_favus_bomb_cards(vector<vector<int>>& ways,int favus, int favus_count);

	// ---------------------------------------------------------------------------------------------------
	// -- 出牌搜索
	// -- 注意 : 添加的出牌方法第一张必须为牌值 
	static void get_single_ways(vector<pair<vector<int>, int>>& ways, const vector<int>& index_count, int pressval, int favus, int favus_count);
	static void get_pair_ways(vector<pair<vector<int>, int>>& ways, const vector<int>& index_count, int pressval, int favus, int favus_count);
	static void get_trio_ways(vector<pair<vector<int>, int>>& ways, const vector<int>& index_count, int pressval, int favus, int favus_count);
	static void get_favus_bomb_ways(vector<pair<vector<int>, int>>& ways, const vector<int>& index_count, int pressval, int favus, int favus_count);
	static void get_bomb_ways(vector<pair<vector<int>, int>>& ways, const vector<int>& index_count, int pressval);
	static void get_all_favus_bomb_ways(vector<pair<vector<int>, int>>& ways, int favus, int favus_count);
	static void get_nuke_ways(vector<pair<vector<int>, int>>& ways, const vector<int>& index_count);
	static void get_trio_1_ways(vector<pair<vector<int>, int>>& ways, const vector<int>& index_count, int pressval, int favus, int favus_count);
	static void get_trio_2_ways(vector<pair<vector<int>, int>>& ways, const vector<int>& index_count, int pressval, int favus, int favus_count);
	static void get_straight_ways(vector<pair<vector<int>, int>>& ways, const vector<int>& index_count, int pressval, int presslen, int favus, int favus_count);
	static void get_consecutive_pair_ways(vector<pair<vector<int>, int>>& ways, const vector<int>& index_count, int pressval, int presslen, int favus, int favus_count);
	static void get_aeroplane_ways(vector<pair<vector<int>, int>>& ways, const vector<int>& index_count, int pressval, int presslen, int favus, int favus_count);
	static void add_aeroplanes_ways(vector<pair<vector<int>, int>>& ways, const vector<vector<int>>& combin_ways, int staval, int num, int usecount);
	static void get_aeroplane_s2_ways(vector<pair<vector<int>, int>>& ways, const vector<int>& index_count, int pressval, int favus, int favus_count);
	static void get_aeroplane_s3_ways(vector<pair<vector<int>, int>>& ways, const vector<int>& index_count, int pressval, int favus, int favus_count);
	static void get_aeroplane_s4_ways(vector<pair<vector<int>, int>>& ways, const vector<int>& index_count, int pressval, int favus, int favus_count);
	static void add_aeroplanel_ways(vector<pair<vector<int>, int>>& ways, const vector<vector<int>>& combin_ways, int staval, int num, int usecount);
	static void get_aeroplane_l2_ways(vector<pair<vector<int>, int>>& ways, const vector<int>& index_count, int pressval, int favus, int favus_count);
	static void get_aeroplane_l3_ways(vector<pair<vector<int>, int>>& ways, const vector<int>& index_count, int pressval, int favus, int favus_count);
	static void get_four_1_ways(vector<pair<vector<int>, int>>& ways, const vector<int>& index_count, int pressval, int favus, int favus_count);
	static void get_four_2_ways(vector<pair<vector<int>, int>>& ways, const vector<int>& index_count, int pressval, int favus, int favus_count);
	static vector<pair<vector<int>, int>> get_press_putways(const vector<int>& cards, int presstype, int pressval, int presslen, int favus);
	static vector<pair<vector<int>, int>> get_free_putways(const vector<int>& cards, int favus);
	//////////////////////////////////////////////////////////////////////////

	////////////////////////////待codereview//////////////////////////////////
	static vector<int>				get_a_good_way(const vector<int>& index_count, int favus, int favus_count, int cardlen);
	static vector<int>				get_good_putways(const vector<int>& cards, int favus, int favus_count);
	//////////////////////////////////////////////////////////////////////////

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
	static vector<pair<vector<int>, int>> limit_ways(int favus, const vector<int>& cards, const vector<pair<vector<int>, int>>& ways, int limit_count);
	static FavusAICardData          make_best_way(const pair<vector<int>, int>& way, int val);
	static bool						is_bomb_or_nuke(int favus, const vector<int>& cards);
	static FavusAICardData			get_put_way(int favus, const vector<int>& up_cards, const vector<int>& my_cards, const vector<int>& down_cards, int landlord_index, int presstype, int pressval, int presslen, int press_index, int think_time);
	static int						search_val(int favus, const vector<int>& up_cards, const vector<int>& my_cards, const vector<int>& down_cards, int landlord_index, int presstype, int pressval, int presslen, int press_index, int thinkdepth, int base_score, int beta);
	static int						evaluate(int favus, const vector<int>& cards);
	
	////////////////////////////////---LUA---//////////////////////////////////////////
	static int						Lua_GetTypeNum(int favus, const vector<int>& cards, int cardtype);
	static bool						Lua_CanPress(const vector<int>& cards, int presstype, int pressval, int presslen, int favus);
	static vector<int>				Lua_GetMaxWays(const vector<int>& cards, int favus, const vector<int> favus_cards);
	static vector<FavusCardData>	Lua_GetCardType(const vector<int>& cards, int favus);
	static vector<vector<int>>		Lua_GetTips(const vector<int>& cards, int presstype, int pressval, int presslen, int favus);
	static FavusAICardData			Lua_GetPutWays(int favus, const vector<int>& up_cards, const vector<int>& my_cards, const vector<int>& down_cards, int landlord_index, int presstype, int pressval, int presslen, int press_index, int think_time);
};