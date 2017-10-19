
extern "C" {
#include "lua.h"
#include "lualib.h"
#include "lauxlib.h"
}

#include "AI_Favus.h"

#define lua_objlen  lua_rawlen
#define luaL_checkint luaL_checkinteger

static std::vector<int> get_vector(lua_State* L, int idx)
{
	std::vector<int> vec;
	int len = lua_objlen(L, idx);
	for (int i = 0; i < len; ++i)
	{
		lua_rawgeti(L, idx, i + 1);
		int v = luaL_checkint(L, -1);
		vec.push_back(v);
	}
	return vec;
}

static void push_vector(lua_State* L, const std::vector<int>& vec)
{
	lua_newtable(L);
	for (size_t i = 0; i < vec.size(); ++i)
	{
		lua_pushinteger(L, vec[i]);
		lua_rawseti(L, -2, i + 1);
	}
}

static void push_vector_vector(lua_State* L, const std::vector<std::vector<int>>& vvec)
{
	lua_newtable(L);
	for (size_t i = 0; i < vvec.size(); ++i)
	{
		push_vector(L, vvec[i]);
		lua_rawseti(L, -2, i + 1);
	}
}

static void push_vector_card_data(lua_State* L, const std::vector<pair<int,int>>& vfcd)
{
	lua_newtable(L);
	for (size_t i = 0; i < vfcd.size(); ++i)
	{
		lua_newtable(L);

		lua_pushinteger(L, vfcd[i].first);
		lua_rawseti(L, -2, 1);
		//lua_setfield(L, -2, "cardtype");

		lua_pushinteger(L, vfcd[i].second);
		lua_rawseti(L, -2, 2);
		//lua_setfield(L, -2, "cardval");

		lua_rawseti(L, -2, i + 1);
	}
}

static void push_vector_favus_card_data(lua_State* L, const std::vector<FavusCardData>& vfcd)
{
	lua_newtable(L);
	for (size_t i = 0; i < vfcd.size(); ++i)
	{
		lua_newtable(L);

		lua_pushinteger(L, vfcd[i].cardtype);
		lua_rawseti(L, -2, 1);
		//lua_setfield(L, -2, "cardtype");

		lua_pushinteger(L, vfcd[i].cardval);
		lua_rawseti(L, -2, 2);
		//lua_setfield(L, -2, "cardval");

		lua_newtable(L);
		for (size_t k = 0; k < vfcd[i].favuscards.size(); ++k)
		{
			lua_pushinteger(L, vfcd[i].favuscards[k]);
			lua_rawseti(L, -2, k + 1);
		}
		lua_rawseti(L, -2, 3);
		//lua_setfield(L, -2, "favuscards");

		lua_rawseti(L, -2, i + 1);
	}
}

static void push_FavusAI_card_data(lua_State* L, const FavusAICardData& faicd)
{
	lua_newtable(L);

	push_vector(L, faicd.cards);
	lua_rawseti(L, -2, 1);

	lua_pushinteger(L, faicd.cardtype);
	lua_rawseti(L, -2, 2);

	lua_pushinteger(L, faicd.cardval);
	lua_rawseti(L, -2, 3);

	push_vector(L, faicd.favuscards);
	lua_rawseti(L, -2, 4);
}

static void push_NormalAI_card_data(lua_State* L, const NormalAICardData& faicd)
{
	lua_newtable(L);

	push_vector(L, faicd.cards);
	lua_rawseti(L, -2, 1);

	lua_pushinteger(L, faicd.cardtype);
	lua_rawseti(L, -2, 2);

	lua_pushinteger(L, faicd.cardval);
	lua_rawseti(L, -2, 3);
}

/////////////////////////////--NORMAL--/////////////////////////////////////////////
static int GameAI_GetCardType(lua_State* L)
{
	luaL_checktype(L, 1, LUA_TTABLE);
	std::vector<int> cards = get_vector(L, 1);
	vector<pair<int, int>> cardtype = NormalAI::Lua_GetCardType(cards);
	push_vector_card_data(L, cardtype);
	return 1;
}

static int GameAI_GetPlayTips(lua_State* L)
{
	luaL_checktype(L, 1, LUA_TTABLE);
	std::vector<int> cards = get_vector(L, 1);
	int presstype = luaL_checkint(L, 2);
	int pressval = luaL_checkint(L, 3);
	int presslen = luaL_checkint(L, 4);
	vector<vector<int>> playtips = NormalAI::Lua_GetTips(cards, presstype, pressval, presslen);
	push_vector_vector(L, playtips);
	return 1;
}

static int GameAI_CanPress(lua_State* L)
{
	luaL_checktype(L, 1, LUA_TTABLE);
	std::vector<int> cards = get_vector(L, 1);
	int presstype = luaL_checkint(L, 2);
	int pressval = luaL_checkint(L, 3);
	int presslen = luaL_checkint(L, 4);
	bool canpress = NormalAI::Lua_CanPress(cards, presstype, pressval, presslen);
	lua_pushboolean(L, canpress ? 1 : 0);
	return 1;
}

static int GameAI_GetMaxWays(lua_State* L)
{
	luaL_checktype(L, 1, LUA_TTABLE);
	std::vector<int> cards = get_vector(L, 1);
	vector<int> maxway = NormalAI::Lua_GetMaxWays(cards);
	push_vector(L, maxway);
	return 1;
}

static int GameAI_GetTypeNum(lua_State* L)
{
	luaL_checktype(L, 1, LUA_TTABLE);
	std::vector<int> cards = get_vector(L, 1);
	int cardtype = luaL_checkint(L, 2);
	int num = NormalAI::Lua_GetTypeNum(cards, cardtype);
	lua_pushinteger(L, num);
	return 1;
}

static int GameAI_GetAIPutWays(lua_State* L)
{
	luaL_checktype(L, 1, LUA_TTABLE);
	std::vector<int> up_cards = get_vector(L, 1);
	luaL_checktype(L, 2, LUA_TTABLE);
	std::vector<int> my_cards = get_vector(L, 2);
	luaL_checktype(L, 3, LUA_TTABLE);
	std::vector<int> down_cards = get_vector(L, 3);
	int landlord_index = luaL_checkint(L, 4);
	int presstype = luaL_checkint(L, 5);
	int pressval = luaL_checkint(L, 6);
	int presslen = luaL_checkint(L, 7);
	int press_index = luaL_checkint(L, 8);
	int think_time = luaL_checkint(L, 9);
	NormalAICardData putway_data = NormalAI::Lua_GetPutWays(up_cards, my_cards, down_cards, landlord_index, presstype, pressval, presslen, press_index, think_time);
	push_NormalAI_card_data(L, putway_data);
	return 1;
}
//////////////////////////////////////////////////////////////////////////

/////////////////////////////--FAVUS--/////////////////////////////////////////////
static int GameAI_FAVUS_GetCardType(lua_State* L)
{
	luaL_checktype(L, 1, LUA_TTABLE);
	std::vector<int> cards = get_vector(L, 1);
	int favus = luaL_checkint(L, 2);
	vector<FavusCardData> card_data = FavusAI::Lua_GetCardType(cards, favus);
	push_vector_favus_card_data(L, card_data);
	return 1;
}

static int GameAI_FAVUS_GetPlayTips(lua_State* L)
{
	luaL_checktype(L, 1, LUA_TTABLE);
	std::vector<int> cards = get_vector(L, 1);
	int presstype = luaL_checkint(L, 2);
	int pressval = luaL_checkint(L, 3);
	int presslen = luaL_checkint(L, 4);
	int favus = luaL_checkint(L, 5);
	vector<vector<int>> playtips = FavusAI::Lua_GetTips(cards, presstype, pressval, presslen, favus);
	push_vector_vector(L, playtips);
	return 1;
}

static int GameAI_FAVUS_CanPress(lua_State* L)
{
	luaL_checktype(L, 1, LUA_TTABLE);
	std::vector<int> cards = get_vector(L, 1);
	int presstype = luaL_checkint(L, 2);
	int pressval = luaL_checkint(L, 3);
	int presslen = luaL_checkint(L, 4);
	int favus = luaL_checkint(L, 5);
	bool canpress = FavusAI::Lua_CanPress(cards, presstype, pressval, presslen, favus);
	lua_pushboolean(L, canpress ? 1 : 0);
	return 1;
}

static int GameAI_FAVUS_GetMaxWays(lua_State* L)
{
	luaL_checktype(L, 1, LUA_TTABLE);
	std::vector<int> cards = get_vector(L, 1);
	int favus = luaL_checkint(L, 2);
	luaL_checktype(L, 3, LUA_TTABLE);
	std::vector<int> favus_cards = get_vector(L, 3);
	vector<int> maxway = FavusAI::Lua_GetMaxWays(cards, favus, favus_cards);
	push_vector(L, maxway);
	return 1;
}

static int GameAI_FAVUS_GetTypeNum(lua_State* L)
{
	int favus = luaL_checkint(L, 1);
	luaL_checktype(L, 2, LUA_TTABLE);
	std::vector<int> cards = get_vector(L, 2);
	int cardtype = luaL_checkint(L, 3);
	std::vector<int> favus_cards = get_vector(L, 3);
	int num = FavusAI::Lua_GetTypeNum(favus, cards, cardtype);
	lua_pushinteger(L, num);
	return 1;
}

static int GameAI_FAVUS_GetAIPutWays(lua_State* L)
{
	int favus = luaL_checkint(L, 1);
	luaL_checktype(L, 2, LUA_TTABLE);
	std::vector<int> up_cards = get_vector(L, 2);
	luaL_checktype(L, 3, LUA_TTABLE);
	std::vector<int> my_cards = get_vector(L, 3);
	luaL_checktype(L, 4, LUA_TTABLE);
	std::vector<int> down_cards = get_vector(L, 4);
	int landlord_index = luaL_checkint(L, 5);
	int presstype = luaL_checkint(L, 6);
	int pressval = luaL_checkint(L, 7);
	int presslen = luaL_checkint(L, 8);
	int press_index = luaL_checkint(L, 9);
	int think_time = luaL_checkint(L, 10);
	FavusAICardData putway_data = FavusAI::Lua_GetPutWays(favus, up_cards, my_cards, down_cards, landlord_index, presstype, pressval, presslen, press_index, think_time);
	push_FavusAI_card_data(L, putway_data);
	return 1;
}
//////////////////////////////////////////////////////////////////////////

static const struct luaL_Reg gameAI_methods[] = {
		"GetTypeNum", GameAI_GetTypeNum,
		"GetCardType", GameAI_GetCardType,
		"GetPlayTips", GameAI_GetPlayTips,
		"CanPress", GameAI_CanPress,
		"GetMaxWays", GameAI_GetMaxWays,
		"GetAIPutWays", GameAI_GetAIPutWays,
		"FavusGetTypeNum", GameAI_FAVUS_GetTypeNum,
		"FavusGetCardType", GameAI_FAVUS_GetCardType,
		"FavusGetPlayTips", GameAI_FAVUS_GetPlayTips,
		"FavusCanPress", GameAI_FAVUS_CanPress,
		"FavusGetMaxWays", GameAI_FAVUS_GetMaxWays,
		"FavusGetAIPutWays", GameAI_FAVUS_GetAIPutWays,
		NULL, NULL
	};

extern "C"  int luaopen_ddzAI(lua_State* L)
{
	luaL_newlib(L, gameAI_methods); // 5.2  
	return 1;
}
