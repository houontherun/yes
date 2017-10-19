#include "AI_Normal.h"

#ifdef WIN32
#include <ctime>
#else
#include <sys/time.h>
#endif

int NormalAI::m_nStartTime = 0;
int NormalAI::m_nThinkTime = 0;

bool NormalAI::can_press(const vector<int>& cards, int presstype, int pressval, int presslen)
{
	vector<pair<int, int>> cards_type = get_cards_type(cards);
	if (cards_type[0].first==NUKE_TYPE)
		return true;
	if (cards_type[0].first != ERROR_TYPE)
	{
		if (presstype == ERROR_TYPE)
        {
            return false;
        }
		if (cards_type[0].first == BOMB_TYPE && presstype < BOMB_TYPE)
		{
			return true;
		}
		if (cards_type[0].first == presstype && cards_type[0].second > pressval && cards.size() == presslen)
		{
			return true;
		}
		if (cards_type.size()>1)
		{
			if (cards_type[1].first == presstype && cards_type[1].second > pressval && cards.size() == presslen)
			{
				return true;
			}
		}
	}
	return false;
}

vector<pair<int, int>> NormalAI::get_cards_type(const vector<int>& cards)
{
	int cardlen = cards.size();
	vector<pair<int, int>> result_type;
	switch (cardlen)
	{
	case 1:
	{
		result_type.push_back(std::move(make_pair(SINGLE_TYPE, cards[0])));
		return result_type;
	}
	case 2:
	{
		if (cards[0] == cards[1])
		{
			result_type.push_back(std::move(make_pair(PAIR_TYPE, cards[0])));
			return result_type;
		}
		else if (cards[0] == 14 && cards[1] == 15)
		{
			result_type.push_back(std::move(make_pair(NUKE_TYPE, cards[0])));
			return result_type;
		}
		break;
	}
	case 3:
	{
		if (cards[0] == cards[1] && cards[1] == cards[2])
		{
			result_type.push_back(std::move(make_pair(TRIO_TYPE, cards[0])));
			return result_type;
		}
		break;
	}
	case 4:
	{
		if (cards[0] == cards[1] && cards[1] == cards[2] && cards[2] == cards[3])
		{
			result_type.push_back(std::move(make_pair(BOMB_TYPE, cards[0])));
			return result_type;
		}
		else if (cards[0] != cards[1] && cards[1] == cards[2] && cards[2] == cards[3])
		{
			result_type.push_back(std::move(make_pair(TRIOSINGLE_TYPE, cards[1])));
			return result_type;
		}
		else if (cards[0] == cards[1] && cards[1] == cards[2] && cards[2] != cards[3])
		{
			result_type.push_back(std::move(make_pair(TRIOSINGLE_TYPE, cards[0])));
			return result_type;
		}
		break;
	}
	case 5:
	{
		if (cards[0] == cards[1] && cards[1] != cards[2] && cards[2] == cards[3] && cards[3] == cards[4])
		{
			result_type.push_back(std::move(make_pair(TRIODOUBLE_TYPE, cards[2])));
			return result_type;
		}
		else if (cards[0] == cards[1] && cards[1] == cards[2] && cards[2] != cards[3] && cards[3] == cards[4])
		{
			result_type.push_back(std::move(make_pair(TRIODOUBLE_TYPE, cards[0])));
			return result_type;
		}
		pair<bool, int> judgetype = is_straight(cards);
		if (judgetype.first)
		{
			result_type.push_back(std::move(make_pair(STRAIGHT_TYPE, judgetype.second)));
			return result_type;
		}
		break;
	}
	case 6:
	{
		pair<bool, int> judgetype = is_straight(cards);
		if (judgetype.first)
		{
			result_type.push_back(std::move(make_pair(STRAIGHT_TYPE, judgetype.second)));
			return result_type;
		}

		judgetype = is_consecutive_pair(cards);
		if (judgetype.first)
		{
			result_type.push_back(std::move(make_pair(CONPAIR_TYPE, judgetype.second)));
			return result_type;
		}

		judgetype = is_aeroplane(cards);
		if (judgetype.first)
		{
			result_type.push_back(std::move(make_pair(AEROPLANE_TYPE, judgetype.second)));
			return result_type;
		}

		judgetype = is_four_single(cards);
		if (judgetype.first)
		{
			result_type.push_back(std::move(make_pair(FOURSINGLE_TYPE, judgetype.second)));
			return result_type;
		}
		break;
	}
	case 7:
	{
		pair<bool, int> judgetype = is_straight(cards);
		if (judgetype.first)
		{
			result_type.push_back(std::move(make_pair(STRAIGHT_TYPE, judgetype.second)));
			return result_type;
		}
		break;
	}
	case 8:
	{
		pair<bool, int> judgetype = is_straight(cards);
		if (judgetype.first)
		{
			result_type.push_back(std::move(make_pair(STRAIGHT_TYPE, judgetype.second)));
			return result_type;
		}

		judgetype = is_consecutive_pair(cards);
		if (judgetype.first)
		{
			result_type.push_back(std::move(make_pair(CONPAIR_TYPE, judgetype.second)));
			return result_type;
		}

        // 像33334444这种特殊情况，可以当作4带2对以及飞机两种牌型，则都需要添加
		judgetype = is_four_double(cards);
		if (judgetype.first)
			result_type.push_back(std::move(make_pair(FOURDOUBLE_TYPE, judgetype.second)));

		judgetype = is_aeroplane_small(cards, 2);
		if (judgetype.first)
			result_type.push_back(std::move(make_pair(AEROPLANES_TYPE, judgetype.second)));

		if (!result_type.empty())
			return result_type;
		break;
	}
	case 9:
	{
		pair<bool, int> judgetype = is_straight(cards);
		if (judgetype.first)
		{
			result_type.push_back(std::move(make_pair(STRAIGHT_TYPE, judgetype.second)));
			return result_type;
		}

		judgetype = is_aeroplane(cards);
		if (judgetype.first)
		{
			result_type.push_back(std::move(make_pair(AEROPLANE_TYPE, judgetype.second)));
			return result_type;
		}
		break;
	}
	case 10:
	{
		pair<bool, int> judgetype = is_straight(cards);
		if (judgetype.first)
		{
			result_type.push_back(std::move(make_pair(STRAIGHT_TYPE, judgetype.second)));
			return result_type;
		}

		judgetype = is_consecutive_pair(cards);
		if (judgetype.first)
		{
			result_type.push_back(std::move(make_pair(CONPAIR_TYPE, judgetype.second)));
			return result_type;
		}

		judgetype = is_aeroplane_large(cards, 2);
		if (judgetype.first)
		{
			result_type.push_back(std::move(make_pair(AEROPLANEL_TYPE, judgetype.second)));
			return result_type;
		}
		break;
	}
	case 11:
	{
		pair<bool, int> judgetype = is_straight(cards);
		if (judgetype.first)
		{
			result_type.push_back(std::move(make_pair(STRAIGHT_TYPE, judgetype.second)));
			return result_type;
		}
		break;
	}
	case 12:
	{
		pair<bool, int> judgetype = is_straight(cards);
		if (judgetype.first)
		{
			result_type.push_back(std::move(make_pair(STRAIGHT_TYPE, judgetype.second)));
			return result_type;
		}

		judgetype = is_consecutive_pair(cards);
		if (judgetype.first)
		{
			result_type.push_back(std::move(make_pair(CONPAIR_TYPE, judgetype.second)));
			return result_type;
		}

		// 像333444555666这种特殊情况，可以当作飞机以及飞机带小翼两种牌型，则都需要添加
		judgetype = is_aeroplane(cards);
		if (judgetype.first)
			result_type.push_back(std::move(make_pair(AEROPLANE_TYPE, judgetype.second)));

		judgetype = is_aeroplane_small(cards, 3);
		if (judgetype.first)
			result_type.push_back(std::move(make_pair(AEROPLANES_TYPE, judgetype.second)));

		if (!result_type.empty())
			return result_type;
		break;
	}
	case 14:
	{
		pair<bool, int> judgetype = is_consecutive_pair(cards);
		if (judgetype.first)
		{
			result_type.push_back(std::move(make_pair(CONPAIR_TYPE, judgetype.second)));
			return result_type;
		}
		break;
	}
	case 15:
	{
		pair<bool, int> judgetype = is_aeroplane(cards);
		if (judgetype.first)
		{
			result_type.push_back(std::move(make_pair(AEROPLANE_TYPE, judgetype.second)));
			return result_type;
		}

		judgetype = is_aeroplane_large(cards, 3);
		if (judgetype.first)
		{
			result_type.push_back(std::move(make_pair(AEROPLANEL_TYPE, judgetype.second)));
			return result_type;
		}
		break;
	}
	case 16:
	{
		pair<bool, int> judgetype = is_consecutive_pair(cards);
		if (judgetype.first)
		{
			result_type.push_back(std::move(make_pair(CONPAIR_TYPE, judgetype.second)));
			return result_type;
		}

		judgetype = is_aeroplane_small(cards, 4);
		if (judgetype.first)
		{
			result_type.push_back(std::move(make_pair(AEROPLANES_TYPE, judgetype.second)));
			return result_type;
		}
		break;
	}
	case 18:
	{
		pair<bool, int> judgetype = is_consecutive_pair(cards);
		if (judgetype.first)
		{
			result_type.push_back(std::move(make_pair(CONPAIR_TYPE, judgetype.second)));
			return result_type;
		}

		judgetype = is_aeroplane(cards);
		if (judgetype.first)
		{
			result_type.push_back(std::move(make_pair(AEROPLANE_TYPE, judgetype.second)));
			return result_type;
		}
		break;
	}
	case 20:
	{
		pair<bool, int> judgetype = is_consecutive_pair(cards);
		if (judgetype.first)
		{
			result_type.push_back(std::move(make_pair(CONPAIR_TYPE, judgetype.second)));
			return result_type;
		}

		// 像33344455556666777888这种特殊情况，可以当作飞机带小翼以及飞机带大翼两种牌型，则都需要添加
		judgetype = is_aeroplane_small(cards, 5);
		if (judgetype.first)
			result_type.push_back(std::move(make_pair(AEROPLANES_TYPE, judgetype.second)));

		judgetype = is_aeroplane_large(cards, 4);
		if (judgetype.first)
			result_type.push_back(std::move(make_pair(AEROPLANEL_TYPE, judgetype.second)));

		if (!result_type.empty())
			return result_type;
		break;
	}
	default:
		break;
	}
	result_type.push_back(std::move(make_pair(ERROR_TYPE, 0)));
	return result_type;
}

//////////////////////////////////////////////////////////////////////////
pair<bool, int> NormalAI::is_straight(const vector<int>& cards)
{
	int len = cards.size();
	if (cards[len - 1] > 12)
		return make_pair(false, 0);
	for (int i = 0; i < len - 1; ++i)
	{
		if (cards[i] + 1 != cards[i + 1])
			return make_pair(false, 0);
	}
	return make_pair(true, cards[0]);
}

pair<bool, int> NormalAI::is_consecutive_pair(const vector<int>& cards)
{
	int len = cards.size();
	if (cards[len - 1] > 12)
		return make_pair(false, 0);
	if (cards[0] != cards[1])
		return make_pair(false, 0);
	for (int i = 0; i < len - 3; i += 2)
	{
		if (cards[i] + 1 != cards[i + 2])
			return make_pair(false, 0);
		if (cards[i + 1] + 1 != cards[i + 3])
			return make_pair(false, 0);
	}
	return make_pair(true, cards[0]);
}

pair<bool, int> NormalAI::is_aeroplane(const vector<int>& cards)
{
	int len = cards.size();
	if (cards[len - 1] > 12)
		return make_pair(false, 0);
	if (cards[0] != cards[1])
		return make_pair(false, 0);
	if (cards[0] != cards[2])
		return make_pair(false, 0);
	for (int i = 0; i < len - 5; i += 3)
	{
		if (cards[i] + 1 != cards[i + 3])
			return make_pair(false, 0);
		if (cards[i + 1] + 1 != cards[i + 4])
			return make_pair(false, 0);
		if (cards[i + 2] + 1 != cards[i + 5])
			return make_pair(false, 0);
	}
	return make_pair(true, cards[0]);
}

pair<bool, int> NormalAI::is_aeroplane_small(const vector<int>& cards, int num)
{
	int plane_end = 0;
	int len = cards.size();
	int findindex = len - 1;
	for (; findindex >= 5; --findindex)
	{
		if (cards[findindex] == cards[findindex - 1] &&
			cards[findindex - 1] == cards[findindex - 2] &&
			cards[findindex - 2] == cards[findindex - 3] + 1 &&
			cards[findindex - 3] == cards[findindex - 4] &&
			cards[findindex - 4] == cards[findindex - 5])
		{
			plane_end = cards[findindex];
			findindex -= 6;
			break;
		}
	}
	if (plane_end == 0 || plane_end > 12)
		return make_pair(false, 0);
	int plane_sta = plane_end - 1;
	for (; findindex >= 2; --findindex)
	{
		if (cards[findindex] == plane_sta - 1)
		{
			if (cards[findindex] == cards[findindex - 1] && cards[findindex - 1] == cards[findindex - 2])
			{
				plane_sta = cards[findindex];
				findindex -= 2;
				if (plane_end - plane_sta + 1 == num)
					return make_pair(true, plane_sta);
			}
			else
			{
				break;
			}
		}
		if (cards[findindex] < plane_sta - 1)
		{
			break;
		}
	}
	if (plane_sta == plane_end)
		return make_pair(false, 0);
	if (plane_end - plane_sta + 1 == num)
		return make_pair(true, plane_sta);
	return make_pair(false, 0);
}

pair<bool, int> NormalAI::is_aeroplane_large(const vector<int>& cards, int num)
{
	int plane_end = 0;
	int pair_count = 0;
	int len = cards.size();
	int findindex = len - 1;
	for (; findindex >= 3; --findindex)
	{
		if (cards[findindex] == cards[findindex - 1] &&
			cards[findindex - 1] == cards[findindex - 2] && 
			cards[findindex - 2] != cards[findindex - 3])
		{
			plane_end = cards[findindex];
			findindex -= 3;
			break;
		}
		else 
		{
			if (cards[findindex] == cards[findindex - 1])
			{
				pair_count++;
				findindex--;
			}
			else
			{
				break;
			}
		}
	}
	if (plane_end == 0 || plane_end > 12)
		return make_pair(false, 0);
	int plane_sta = plane_end;
	for (; findindex >= 2; --findindex)
	{
		if (cards[findindex] == plane_sta - 1 &&
			cards[findindex] == cards[findindex - 1] &&
			cards[findindex - 1] == cards[findindex - 2] &&
			(findindex == 2 || (findindex > 2 && cards[findindex - 2] != cards[findindex - 3])))
		{
			plane_sta = cards[findindex];
			findindex -= 2;
		}
		else
		{
			break;
		}
	}
	for (; findindex >= 1; --findindex)
	{
		if (cards[findindex] == cards[findindex - 1])
		{
			pair_count++;
			findindex--;
		}
		else
		{
			break;
		}
	}
	if (pair_count != num)
		return make_pair(false, 0);
	if (plane_sta == plane_end)
		return make_pair(false, 0);
	if (plane_end - plane_sta + 1 == num)
		return make_pair(true, plane_sta);
	return make_pair(false, 0);
}

pair<bool, int> NormalAI::is_four_single(const vector<int>& cards)
{
	if (cards[0] == cards[1] &&
		cards[1] == cards[2] &&
		cards[2] == cards[3] &&
		cards[0] != cards[4] &&
		cards[0] != cards[5])
	{
		return make_pair(true, cards[0]);
	}
	if (cards[1] != cards[0] &&
		cards[1] == cards[2] &&
		cards[2] == cards[3] &&
		cards[3] == cards[4] &&
		cards[1] != cards[5])
	{
		return make_pair(true, cards[1]);
	}
	if (cards[0] != cards[2] &&
		cards[1] != cards[2] &&
		cards[2] == cards[3] &&
		cards[3] == cards[4] &&
		cards[4] == cards[5])
	{
		return make_pair(true, cards[2]);
	}
	return make_pair(false, 0);
}

pair<bool, int> NormalAI::is_four_double(const vector<int>& cards)
{
	if (cards[0] == cards[1] &&
		cards[1] != cards[4] &&
		cards[2] == cards[3] &&
		cards[3] != cards[4] &&
		cards[4] == cards[5] &&
		cards[5] == cards[6] &&
		cards[6] == cards[7])
	{
		return make_pair(true, cards[4]);
	}
	if (cards[0] == cards[1] &&
		cards[0] != cards[2] &&
		cards[2] == cards[3] &&
		cards[3] == cards[4] &&
		cards[4] == cards[5] &&
		cards[6] != cards[2] &&
		cards[6] == cards[7])
	{
		return make_pair(true, cards[2]);
	}
	if (cards[0] == cards[1] &&
		cards[1] == cards[2] &&
		cards[2] == cards[3] &&
		cards[0] != cards[4] &&
		cards[4] == cards[5] &&
		cards[0] != cards[6] &&
		cards[6] == cards[7])
	{
		return make_pair(true, cards[0]);
	}
	return make_pair(false, 0);
}

//////////////////////////////////////////////////////////////////////////
vector<vector<int>> NormalAI::get_press_tip_ways(const vector<int>& index_count, int presstype, int pressval, int presslen)
{
	vector<vector<int>> putways;
	if (presstype >= FAVUS_BOMB_TYPE)
	{
		if (presstype == NUKE_TYPE)
		{
			return putways;
		}
		else
		{
			if (presstype != ALLFAVUS_BOMB_TYPE)
				get_tip_bomb_cards(putways, index_count, pressval);
			get_tip_nuke_cards(putways, index_count);
		}
	}
	else
	{
		switch (presstype)
		{
		case SINGLE_TYPE:
		{
			get_tip_single_cards(putways, index_count, pressval);
			break;
		}
		case PAIR_TYPE:
		{
			get_tip_pair_cards(putways, index_count, pressval);
			break;
		}
		case TRIO_TYPE:
		{
			get_tip_trio_cards(putways, index_count, pressval);
			break;
		}
		case TRIOSINGLE_TYPE:
		{
			get_tip_trio_1_cards(putways, index_count, pressval);
			break;
		}
		case TRIODOUBLE_TYPE:
		{
			get_tip_trio_2_cards(putways, index_count, pressval);
			break;
		}
		case STRAIGHT_TYPE:
		{
			get_tip_straight_cards(putways, index_count, pressval, presslen);
			break;
		}
		case CONPAIR_TYPE:
		{
			get_tip_consecutive_pair_cards(putways, index_count, pressval, presslen);
			break;
		}
		case AEROPLANE_TYPE:
		{
			get_tip_aeroplane_cards(putways, index_count, pressval, presslen);
			break;
		}
		case AEROPLANES_TYPE:
		{
			get_tip_aeroplane_s_cards(putways, index_count, pressval, presslen);
			break;
		}
		case AEROPLANEL_TYPE:
		{
			get_tip_aeroplane_l_cards(putways, index_count, pressval, presslen);
			break;
		}
		case FOURSINGLE_TYPE:
		{
			get_tip_four_1_cards(putways, index_count, pressval);
			break;
		}
		case FOURDOUBLE_TYPE:
		{
			get_tip_four_2_cards(putways, index_count, pressval);
			break;
		}
		default:
			break;
		}
		get_tip_bomb_cards(putways, index_count, 0);
		get_tip_nuke_cards(putways, index_count);
	}
	return putways;
}


void NormalAI::get_tip_single_cards(vector<vector<int>>& ways, const vector<int>& index_count, int pressval)
{
	for (int k = 1; k < 4; ++k)
	{
		for (int i = pressval + 1; i < 16; ++i)
		{
			if (index_count[i] == k)
			{
				vector<int> way(1, i);
				ways.push_back(std::move(way));
			}
		}
	}
}

void NormalAI::get_tip_pair_cards(vector<vector<int>>& ways, const vector<int>& index_count, int pressval)
{
	for (int k = 2; k < 4; ++k)
    {
		for (int i = pressval + 1; i < 14; ++i)
		{
			if (index_count[i] == k)
			{
				vector<int> way(2, i);
				ways.push_back(std::move(way));
			}
		}
	}
}

void NormalAI::get_tip_trio_cards(vector<vector<int>>& ways, const vector<int>& index_count, int pressval)
{
	for (int i = pressval + 1; i < 14; ++i)
	{
		if (index_count[i] == 3)
		{
			vector<int> way(3, i);
			ways.push_back(std::move(way));
		}
	}
}

void NormalAI::get_tip_trio_1_cards(vector<vector<int>>& ways, const vector<int>& index_count, int pressval)
{
	for (int i = pressval + 1; i < 14; i++)
	{
		if (index_count[i] == 3)
		{
			bool founded = false;
			for (int k = 1; k < 16; k++)
			{
				if (index_count[k] == 1 && !founded)
				{
					founded = true;
					vector<int> way = { i, i, i, k };
					ways.push_back(std::move(way));
					break;
				}
			}
			if (!founded)
			{
				for (int k = 1; k < 14; k++)
				{
					if (index_count[k] == 2 && !founded)
					{
						founded = true;
						vector<int> way = { i, i, i, k };
						ways.push_back(std::move(way));
						break;
					}
				}
			}
			if (!founded)
			{
				for (int k = 1; k < 14; k++)
				{
					if (index_count[k] == 3 && !founded && k != i)
					{
						founded = true;
						vector<int> way = { i, i, i, k };
						ways.push_back(std::move(way));
						break;
					}
				}
			}
		}
	}
}

void NormalAI::get_tip_trio_2_cards(vector<vector<int>>& ways, const vector<int>& index_count, int pressval)
{
	for (int i = pressval + 1; i < 14; i++)
	{
		if (index_count[i] == 3)
		{
			bool founded = false;
			for (int k = 1; k < 14; k++)
			{
				if (index_count[k] == 2 && !founded)
				{
					founded = true;
					vector<int> way = { i, i, i, k, k };
					ways.push_back(std::move(way));
					break;
				}
			}
			if (!founded)
			{
				for (int k = 1; k < 14; k++)
				{
					if (index_count[k] == 3 && !founded && k != i)
					{
						founded = true;
						vector<int> way = { i, i, i, k, k };
						ways.push_back(std::move(way));
						break;
					}
				}
			}
		}
	}
}

void NormalAI::get_tip_straight_cards(vector<vector<int>>& ways, const vector<int>& index_count, int pressval, int len)
{
	if (pressval + len >= 13)
		return;
	for (int pv = pressval + 1; pv <= 13 - len; pv++)
	{
		bool founded = true;
		for (int i = pv; i < pv + len; ++i)
		{
			if (index_count[i] == 0)
			{
				founded = false;
				break;
			}
		}
		if (founded)
		{
			vector<int> way(len, 0);
			for (int k = 0; k < len; ++k)
				way[k] = pv + k;
			ways.push_back(std::move(way));
		}
	}
}

void NormalAI::get_tip_consecutive_pair_cards(vector<vector<int>>& ways, const vector<int>& index_count, int pressval, int len)
{
	len /= 2;
	if (pressval + len >= 13)
		return;
	for (int pv = pressval + 1; pv <= 13 - len; pv++)
	{
		bool founded = true;
		for (int i = pv; i < pv + len; ++i)
		{
			if (index_count[i] == 4)
			{
				pv = i;
				founded = false;
				break;
			}
			if (index_count[i] < 2)
			{
				founded = false;
				break;
			}
		}
		if (founded)
		{
			vector<int> way(len * 2, 0);
			for (int k = 0; k < len * 2; k += 2)
			{
				way[k] = pv + k / 2;
				way[k + 1] = pv + k / 2;
			}
			ways.push_back(std::move(way));
		}
	}
}

void NormalAI::get_tip_aeroplane_cards(vector<vector<int>>& ways, const vector<int>& index_count, int pressval, int len)
{
	len /= 3;
	if (pressval + len >= 13)
		return;
	for (int pv = pressval + 1; pv <= 13 - len; pv++)
	{
		bool founded = true;
		for (int i = pv; i < pv + len; ++i)
		{
			if (index_count[i] < 3)
			{
				founded = false;
				break;
			}
		}
		if (founded)
		{
			vector<int> way(len * 3, 0);
			for (int k = 0; k < len * 3; k += 3)
			{
				way[k] = pv + k / 3;
				way[k + 1] = pv + k / 3;
				way[k + 2] = pv + k / 3;
			}
			ways.push_back(std::move(way));
		}
	}
}

void NormalAI::get_tip_aeroplane_s_cards(vector<vector<int>>& ways, const vector<int>& index_count, int pressval, int len)
{
	if (len > 16)
		return;
	len /= 4;
	if (pressval + len >= 13)
		return;
	for (int pv = pressval + 1; pv <= 13 - len; pv++)
	{
		bool founded = true;
		for (int k = pv; k < pv + len; ++k)
		{
			if (index_count[k] < 3)
			{
				founded = false;
				break;
			}
		}
		if (founded)
		{
			vector<int> way;
			way.reserve(len * 4);
			vector<int> temp_index_count(index_count);
			for (int k = 0; k < len * 3; k += 3)
			{
				way[k] = pv + k / 3;
				way[k + 1] = pv + k / 3;
				way[k + 2] = pv + k / 3;
				temp_index_count[pv + k / 3] -= 3;
			}
			for (int count = 1; count < 4; ++count)
			{
				for (int k = 1; k < 16; k++)
				{
					if (temp_index_count[k] == count)
					{
						way.push_back(k);
					}
					if (way.size() == len * 4)
						break;
				}
				if (way.size() == len * 4)
				{
					ways.push_back(std::move(way));
					break;
				}
			}
		}
	}
}

void NormalAI::get_tip_aeroplane_l_cards(vector<vector<int>>& ways, const vector<int>& index_count, int pressval, int len)
{
	if (len > 16)
		return;
	len /= 5;
	for (int pv = pressval + 1; pv <= 13 - len; pv++)
	{
		bool founded = true;
		for (int k = pv; k < pv + len; ++k)
		{
			if (index_count[k] < 3)
			{
				founded = false;
				break;
			}
		}
		if (founded)
		{
			vector<int> way;
			way.reserve(len * 5);
			vector<int> temp_index_count(index_count);
			for (int k = 0; k < len * 3; k += 3)
			{
				way[k] = pv + k / 3;
				way[k + 1] = pv + k / 3;
				way[k + 2] = pv + k / 3;
				temp_index_count[pv + k / 3] -= 3;
			}
			for (int count = 2; count < 4; ++count)
			{
				for (int k = 1; k < 14; k++)
				{
					if (temp_index_count[k] == count)
					{
						way.push_back(k);
						way.push_back(k);
					}
					if (way.size() == len * 5)
						break;
				}
				if (way.size() == len * 5)
				{
					ways.push_back(std::move(way));
					break;
				}
			}
		}
	}
}

void NormalAI::get_tip_four_1_cards(vector<vector<int>>& ways, const vector<int>& index_count, int pressval)
{
	for (int i = pressval + 1; i < 14; i++)
	{
		if (index_count[i] == 4)
		{
			vector<int> way(4, i);
			for (int count = 1; count < 4; ++count)
			{
				for (int j = 1; j < 16; j++)
				{
                    if (index_count[j] == count)
                    {
                        way.push_back(j);
                        if (way.size() == 6)
                            break;
                    }
				}
				if (way.size() == 6)
					break;
			}
			if (way.size() == 6)
				ways.push_back(std::move(way));
		}
	}
}

void NormalAI::get_tip_four_2_cards(vector<vector<int>>& ways, const vector<int>& index_count, int pressval)
{
	for (int i = pressval + 1; i < 14; i++)
	{
		if (index_count[i] == 4)
		{
			vector<int> way(4, i);
			for (int count = 2; count < 4; ++count)
			{
				for (int j = 1; j < 14; j++)
				{
					if (index_count[j] == count)
					{
						way.push_back(j);
						way.push_back(j);
                        if (way.size() == 8)
                            break;
					}
				}
				if (way.size() == 8)
					break;
			}
			if (way.size() == 8)
				ways.push_back(std::move(way));
		}
	}
}

void NormalAI::get_tip_bomb_cards(vector<vector<int>>& ways, const vector<int>& index_count, int pressval)
{
	for (int i = pressval + 1; i < 14; ++i)
	{
		if (index_count[i] == 4)
		{
			vector<int> way(4, i);
			ways.push_back(std::move(way));
		}
	}
}

void NormalAI::get_tip_nuke_cards(vector<vector<int>>& ways, const vector<int>& index_count)
{
	if (index_count[14] == 1 && index_count[15] == 1)
	{
        vector<int> way = { 14, 15 };
		ways.push_back(std::move(way));
	}
}

//////////////////////////////////////////////////////////////////////////
void NormalAI::get_single_ways(vector<pair<vector<int>, int>>& ways, const vector<int>& index_count, int pressval)
{
	for (int i = pressval + 1; i < 16; ++i)
	{
		if (index_count[i] >= 1)
		{
			vector<int> way(1, i);
			ways.push_back(std::move(make_pair(std::move(way), SINGLE_TYPE)));
		}
	}
}

void NormalAI::get_pair_ways(vector<pair<vector<int>, int>>& ways, const vector<int>& index_count, int pressval)
{
	for (int i = pressval + 1; i < 14; ++i)
	{
		if (index_count[i] >= 2)
		{
			vector<int> way(2, i);
			ways.push_back(std::move(make_pair(std::move(way), PAIR_TYPE)));
		}
	}
}

void NormalAI::get_trio_ways(vector<pair<vector<int>, int>>& ways, const vector<int>& index_count, int pressval)
{
	for (int i = pressval + 1; i < 14; ++i)
	{
		if (index_count[i] >= 3)
		{
			vector<int> way(3, i);
			ways.push_back(std::move(make_pair(std::move(way), TRIO_TYPE)));
		}
	}
}

void NormalAI::get_bomb_ways(vector<pair<vector<int>, int>>& ways, const vector<int>& index_count, int pressval)
{
	for (int i = pressval + 1; i < 14; ++i)
	{
		if (index_count[i] == 4)
		{
			vector<int> way(4, i);
			ways.push_back(std::move(make_pair(std::move(way), BOMB_TYPE)));
		}
	}
}

void NormalAI::get_trio_1_ways(vector<pair<vector<int>, int>>& ways, const vector<int>& index_count, int pressval)
{
	for (int i = pressval + 1; i < 14; i++)
	{
		if (index_count[i] >= 3)
		{
			for (int k = 1; k < 16; k++)
			{
				if (index_count[k] >= 1 && k != i)
				{
					vector<int> way = { i, i, i, k };
					ways.push_back(std::move(make_pair(std::move(way), TRIOSINGLE_TYPE)));
				}
			}
		}
	}
}

void NormalAI::get_trio_2_ways(vector<pair<vector<int>, int>>& ways, const vector<int>& index_count, int pressval)
{
	for (int i = pressval + 1; i < 14; i++)
	{
		if (index_count[i] >= 3)
		{
			for (int k = 1; k < 14; k++)
			{
				if (index_count[k] >= 2 && k != i)
				{
					vector<int> way = { i, i, i, k, k };
					ways.push_back(std::move(make_pair(std::move(way), TRIODOUBLE_TYPE)));
				}
			}
		}
	}
}

void NormalAI::get_straight_ways(vector<pair<vector<int>, int>>& ways, const vector<int>& index_count, int pressval, int presslen)
{
	if (pressval + presslen >= 13)
		return;
	for (int st = pressval + 1; st <= 13 - presslen; st++)
	{
		bool founded = true;
		int ed = st + presslen;
		for (int i = st; i < ed; ++i)
		{
			if (index_count[i] == 0)
			{
				founded = false;
				break;
			}
		}
		if (founded)
		{
			vector<int> way;
			way.reserve(presslen);
			for (int k = st; k < ed; ++k)
				way.push_back(k);
			ways.push_back(std::move(make_pair(std::move(way), STRAIGHT_TYPE)));
		}
	}
}

void NormalAI::get_consecutive_pair_ways(vector<pair<vector<int>, int>>& ways, const vector<int>& index_count, int pressval, int presslen)
{
	presslen /= 2;
	if (pressval + presslen >= 13)
		return;
	for (int st = pressval + 1; st <= 13 - presslen; st++)
	{
		bool founded = true;
		int ed = st + presslen;
		for (int i = st; i < ed; ++i)
		{
			if (index_count[i] < 2)
			{
				founded = false;
				break;
			}
		}
		if (founded)
		{
			vector<int> way;
			way.reserve(presslen * 2);
			for (int k = st; k < ed; ++k)
			{
				way.push_back(k);
				way.push_back(k);
			}
			ways.push_back(std::move(make_pair(std::move(way), CONPAIR_TYPE)));
		}
	}
}

void NormalAI::get_aeroplane_ways(vector<pair<vector<int>, int>>& ways, const vector<int>& index_count, int pressval, int presslen)
{
	presslen /= 3;
	if (pressval + presslen >= 13)
		return;
	for (int st = pressval + 1; st <= 13 - presslen; st++)
	{
		bool founded = true;
		int ed = st + presslen;
		for (int i = st; i < ed; ++i)
		{
			if (index_count[i] < 3)
			{
				founded = false;
				break;
			}
		}
		if (founded)
		{
			vector<int> way;
			way.reserve(presslen * 3);
			for (int k = st; k < ed; ++k)
			{
				way.push_back(k);
				way.push_back(k);
				way.push_back(k);
			}
			ways.push_back(std::move(make_pair(std::move(way), AEROPLANE_TYPE)));
		}
	}
}

void NormalAI::add_aeroplanes_ways(vector<pair<vector<int>, int>>& ways, const vector<vector<int>>& combin_ways, int staval, int num)
{
	for (const vector<int>& loop_way : combin_ways)
	{
		vector<int> way;
		way.reserve(num * 4);
		for (int val = staval; val < staval + num; ++val)
		{
			way.push_back(val);
			way.push_back(val);
			way.push_back(val);
		}
		way.insert(way.end(), loop_way.begin(), loop_way.end());
		ways.push_back(std::move(make_pair(std::move(way), AEROPLANES_TYPE)));
	}
}

void NormalAI::get_aeroplane_s2_ways(vector<pair<vector<int>, int>>& ways, const vector<int>& index_count, int pressval)
{
	for (int i = pressval + 1; i < 12; i++)
	{
		if (index_count[i] >= 3 &&
			index_count[i + 1] >= 3)
		{
			vector<int> vec_combins_1;
			vector<vector<int>> combin_xx_ways;
			for (int j = 1; j < 16; j++)
			{
				int remain_count = index_count[j];
				if (j == i || j == i + 1)
					remain_count -= 3;
				if (remain_count >= 1)
					vec_combins_1.push_back(j);
				if (remain_count>=2)
					combin_xx_ways.push_back(std::move(vector<int>(2, j)));
			}
			vector<vector<int>> combin_xy_ways = get_combin(vec_combins_1, 2);
			add_aeroplanes_ways(ways, combin_xy_ways, i, 2);
			add_aeroplanes_ways(ways, combin_xx_ways, i, 2);
		}
	}
}

void NormalAI::get_aeroplane_s3_ways(vector<pair<vector<int>, int>>& ways, const vector<int>& index_count, int pressval)
{
	for (int i = pressval + 1; i < 11; i++)
	{
		if (index_count[i] >= 3 &&
			index_count[i + 1] >= 3 &&
			index_count[i + 2] >= 3)
		{
			vector<int> vec_combins_1;
			vector<int> vec_combins_2;
			vector<vector<int>> combin_xxx_ways;
			for (int j = 1; j < 16; j++)
			{
				int remain_count = index_count[j];
				if (j == i || j == i + 1 || j == i + 2)
					remain_count -= 3;
				if (remain_count >= 1)
					vec_combins_1.push_back(j);
				if (remain_count >= 2)
					vec_combins_2.push_back(j);
				if (remain_count >= 3 && j != i + 3)
					combin_xxx_ways.push_back(std::move(vector<int>(3, j)));
			}
			vector<vector<int>> combin_xxy_ways = make_combin(vec_combins_2, 2, vec_combins_1, 1);
			vector<vector<int>> combin_xyz_ways = get_combin(vec_combins_1, 3);
			add_aeroplanes_ways(ways, combin_xxx_ways, i, 3);
			add_aeroplanes_ways(ways, combin_xxy_ways, i, 3);
			add_aeroplanes_ways(ways, combin_xyz_ways, i, 3);
		}
	}
}

void NormalAI::get_aeroplane_s4_ways(vector<pair<vector<int>, int>>& ways, const vector<int>& index_count, int pressval)
{
	for (int i = pressval + 1; i < 10; i++)
	{
		if (index_count[i] >= 3 &&
			index_count[i + 1] >= 3 &&
			index_count[i + 2] >= 3 &&
			index_count[i + 3] >= 3)
		{
			vector<int> vec_combins_1;
			vector<int> vec_combins_2;
			vector<int> vec_combins_3;
			vector<vector<int>> combin_xxxx_ways;
			for (int j = 1; j < 16; j++)
			{
				int remain_count = index_count[j];
				if (j == i || j == i + 1 || j == i + 2 || j == i + 3)
					remain_count -= 3;
				if (remain_count >= 1)
					vec_combins_1.push_back(j);
				if (remain_count >= 2)
					vec_combins_2.push_back(j);
				if (remain_count >= 3 && j != i + 4)
					vec_combins_3.push_back(j);
				if (remain_count == 4 && j != i + 4)
					combin_xxxx_ways.push_back(std::move(vector<int>(4, j)));
			}
			vector<vector<int>> combin_xxxy_ways = make_combin(vec_combins_3, 3, vec_combins_1, 1);
			vector<vector<int>> combin_xxyy_ways = make_combin(vec_combins_2, 2, vec_combins_2, 2);
			vector<vector<int>> combin_xxyz_ways = make_combin(vec_combins_2, 2, vec_combins_1, 1, vec_combins_1, 1);
			vector<vector<int>> combin_xyzl_ways = get_combin(vec_combins_1, 4);
			add_aeroplanes_ways(ways, combin_xxxx_ways, i, 4);
			add_aeroplanes_ways(ways, combin_xxxy_ways, i, 4);
			add_aeroplanes_ways(ways, combin_xxyy_ways, i, 4);
			add_aeroplanes_ways(ways, combin_xxyz_ways, i, 4);
			add_aeroplanes_ways(ways, combin_xyzl_ways, i, 4);
		}
	}
}

void NormalAI::add_aeroplanel_ways(vector<pair<vector<int>, int>>& ways, const vector<vector<int>>& combin_ways, int staval, int num)
{
	for (const vector<int>& loop_way : combin_ways)
	{
		vector<int> way;
		way.reserve(num * 5);
		for (int val = staval; val < staval + num; ++val)
		{
			way.push_back(val);
			way.push_back(val);
			way.push_back(val);
		}
		way.insert(way.end(), loop_way.begin(), loop_way.end());
		way.insert(way.end(), loop_way.begin(), loop_way.end());
		ways.push_back(std::move(make_pair(std::move(way), AEROPLANEL_TYPE)));
	}
}

void NormalAI::get_aeroplane_l2_ways(vector<pair<vector<int>, int>>& ways, const vector<int>& index_count, int pressval)
{
	for (int i = pressval + 1; i < 12; i++)
	{
		if (index_count[i] >= 3 &&
			index_count[i + 1] >= 3 )
		{
			vector<int> vec_combins_1;
			vector<vector<int>> combin_xx_ways;
			for (int j = 1; j < 14; j++)
			{
				int remain_count = index_count[j];
				if (j == i || j == i + 1)
					remain_count -= 3;
				if (remain_count >= 2)
					vec_combins_1.push_back(j);
				if (remain_count == 4)
					combin_xx_ways.push_back(std::move(vector<int>(2, j)));
			}
			vector<vector<int>> combin_xy_ways = get_combin(vec_combins_1, 2);
			add_aeroplanel_ways(ways, combin_xy_ways, i, 2);
			add_aeroplanel_ways(ways, combin_xx_ways, i, 2);
		}
	}
}

void NormalAI::get_aeroplane_l3_ways(vector<pair<vector<int>, int>>& ways, const vector<int>& index_count, int pressval)
{
	for (int i = pressval + 1; i < 11; i++)
	{
		if (index_count[i] >= 3 &&
			index_count[i + 1] >= 3 &&
			index_count[i + 2] >= 3)
		{
			vector<int> vec_combins_1;
			vector<int> vec_combins_2;
			for (int j = 1; j < 14; j++)
			{
				int remain_count = index_count[j];
				if (j == i || j == i + 1 || j == i + 2)
					remain_count -= 3;
				if (remain_count >= 2)
					vec_combins_1.push_back(j);
				if (remain_count == 4)
					vec_combins_2.push_back(j);
			}
			vector<vector<int>> combin_xxy_ways = make_combin(vec_combins_2, 2, vec_combins_1, 1);
			vector<vector<int>> combin_xyz_ways = get_combin(vec_combins_1, 3);
			add_aeroplanel_ways(ways, combin_xxy_ways, i, 3);
			add_aeroplanel_ways(ways, combin_xyz_ways, i, 3);
		}
	}
}

void NormalAI::add_four1_ways(vector<pair<vector<int>, int>>& ways, const vector<vector<int>>& combin_ways, int val)
{
	for (const vector<int>& loop_way : combin_ways)
	{
		vector<int> way = { val, val, val, val, loop_way[0], loop_way[1] };
		ways.push_back(std::move(make_pair(std::move(way), FOURSINGLE_TYPE)));
	}
}

void NormalAI::get_four_1_ways(vector<pair<vector<int>, int>>& ways, const vector<int>& index_count, int pressval)
{
	for (int i = pressval + 1; i < 14; i++)
	{
		if (index_count[i] == 4)
		{
			vector<int> vec_combins_1;
			vector<vector<int>> combin_xx_ways;
			for (int j = 1; j < 16; j++)
			{
				if (j == i)
					continue;
				if (index_count[j] >= 1)
					vec_combins_1.push_back(j);
				if (index_count[j] >= 2)
					combin_xx_ways.push_back(std::move(vector<int>(2, j)));
			}
			vector<vector<int>> combin_xy_ways = get_combin(vec_combins_1, 2);
			add_four1_ways(ways, combin_xy_ways, i);
			add_four1_ways(ways, combin_xx_ways, i);
		}
	}
}

void NormalAI::add_four2_ways(vector<pair<vector<int>, int>>& ways, const vector<vector<int>>& combin_ways, int val)
{
	for (const vector<int>& loop_way : combin_ways)
	{
		vector<int> way = { val, val, val, val, loop_way[0], loop_way[0], loop_way[1], loop_way[1] };
		ways.push_back(std::move(make_pair(std::move(way), FOURDOUBLE_TYPE)));
	}
}

void NormalAI::get_four_2_ways(vector<pair<vector<int>, int>>& ways, const vector<int>& index_count, int pressval)
{
	for (int i = pressval + 1; i < 14; i++)
	{
		if (index_count[i] == 4)
		{
			vector<int> vec_combins_1;
			vector<vector<int>> combin_xx_ways;
			for (int j = 1; j < 14; j++)
			{
				if (j == i)
					continue;
				if (index_count[j] >= 2)
					vec_combins_1.push_back(j);
				if (index_count[j] == 4 && j < i)
					combin_xx_ways.push_back(std::move(vector<int>(2, j)));
			}
			vector<vector<int>> combin_xy_ways = get_combin(vec_combins_1, 2);
			add_four2_ways(ways, combin_xy_ways, i);
			add_four2_ways(ways, combin_xx_ways, i);
		}
	}
}

void NormalAI::get_nuke_ways(vector<pair<vector<int>, int>>& ways, const vector<int>& index_count)
{
	if (index_count[14] == 1 && index_count[15] == 1)
	{
		vector<int> way = { 14, 15 };
		ways.push_back(std::move(make_pair(std::move(way), NUKE_TYPE)));
	}
}

//////////////////////////////////////////////////////////////////////////
vector<pair<vector<int>, int>> NormalAI::get_press_putways(const vector<int>& cards, int presstype, int pressval, int presslen)
{
	vector<int> index_count = get_index_count(cards);
	vector<pair<vector<int>, int>> putways;
	vector<int> pass;
	putways.push_back(std::move(make_pair(std::move(pass), PASS_TYPE)));
	if (presstype >= BOMB_TYPE)
	{
		if (presstype == NUKE_TYPE)
		{
			return putways;
		}
		else
		{
			get_bomb_ways(putways, index_count, pressval);
			get_nuke_ways(putways, index_count);
		}
	}
	else
	{
		int cardlen = cards.size();
		if (cardlen >= presslen)
		{
			switch (presstype)
			{
			case SINGLE_TYPE:
			{
				get_single_ways(putways, index_count, pressval);
				break;
			}
			case PAIR_TYPE:
			{
				get_pair_ways(putways, index_count, pressval);
				break;
			}
			case TRIO_TYPE:
			{
				get_trio_ways(putways, index_count, pressval);
				break;
			}
			case TRIOSINGLE_TYPE:
			{
				get_trio_1_ways(putways, index_count, pressval);
				break;
			}
			case TRIODOUBLE_TYPE:
			{
				get_trio_2_ways(putways, index_count, pressval);
				break;
			}
			case STRAIGHT_TYPE:
			{
				get_straight_ways(putways, index_count, pressval, presslen);
				break;
			}
			case CONPAIR_TYPE:
			{
				get_consecutive_pair_ways(putways, index_count, pressval, presslen);
				break;
			}
			case AEROPLANE_TYPE:
			{
				get_aeroplane_ways(putways, index_count, pressval, presslen);
				break;
			}
			case AEROPLANES_TYPE:
			{
				switch (presslen)
				{
				case 8:
				{
					get_aeroplane_s2_ways(putways, index_count, pressval);
					break;
				}
				case 12:
				{
					get_aeroplane_s3_ways(putways, index_count, pressval);
					break;
				}
				case 16:
				{
					get_aeroplane_s4_ways(putways, index_count, pressval);
					break;
				}
				default:
					break;
				}
				break;
			}
			case AEROPLANEL_TYPE:
			{
				switch (presslen)
				{
				case 10:
				{
					get_aeroplane_l2_ways(putways, index_count, pressval);
					break;
				}
				case 15:
				{
					get_aeroplane_l3_ways(putways, index_count, pressval);
					break;
				}
				default:
					break;
				}
				break;
			}
			case FOURSINGLE_TYPE:
			{
				get_four_1_ways(putways, index_count, pressval);
				break;
			}
			case FOURDOUBLE_TYPE:
			{
				get_four_2_ways(putways, index_count, pressval);
				break;
			}
			default:
				break;
			}
		}
		get_bomb_ways(putways, index_count, 0);
		get_nuke_ways(putways, index_count);
	}
	return putways;
}

vector<pair<vector<int>, int>> NormalAI::get_free_putways(const vector<int>& cards)
{
	vector<pair<vector<int>, int>> putways;
	int cardslen = cards.size();
	vector<int> index_count = get_index_count(cards);
	get_single_ways(putways, index_count, 0);
	if (cardslen >= 2)
	{
		get_pair_ways(putways, index_count, 0);
		get_nuke_ways(putways, index_count);
	}
	if (cardslen >= 3)
	{
		get_trio_ways(putways, index_count, 0);
	}
	if (cardslen >= 4)
	{
		get_bomb_ways(putways, index_count, 0);
		get_trio_1_ways(putways, index_count, 0);
	}
	if (cardslen >= 5)
	{
		get_straight_ways(putways, index_count, 0, 5);
		get_trio_2_ways(putways, index_count, 0);
	}
	if (cardslen >= 6)
	{
		get_straight_ways(putways, index_count, 0, 6);
		get_consecutive_pair_ways(putways, index_count, 0, 6);
		get_aeroplane_ways(putways, index_count, 0, 6);
		get_four_1_ways(putways, index_count, 0);
	}
	if (cardslen >= 7)
	{
		get_straight_ways(putways, index_count, 0, 7);
	}
	if (cardslen >= 8)
	{
		get_straight_ways(putways, index_count, 0, 8);
		get_consecutive_pair_ways(putways, index_count, 0, 8);
		get_aeroplane_s2_ways(putways, index_count, 0);
		get_four_2_ways(putways, index_count, 0);
	}
	if (cardslen >= 9)
	{
		get_straight_ways(putways, index_count, 0, 9);
		get_aeroplane_ways(putways, index_count, 0, 9);
	}
	if (cardslen >= 10)
	{
		get_straight_ways(putways, index_count, 0, 10);
		get_consecutive_pair_ways(putways, index_count, 0, 10);
		get_aeroplane_l2_ways(putways, index_count, 0);
	}
	if (cardslen >= 11)
	{
		get_straight_ways(putways, index_count, 0, 11);
	}
	if (cardslen >= 12)
	{
		get_straight_ways(putways, index_count, 0, 12);
		get_consecutive_pair_ways(putways, index_count, 0, 12);
		get_aeroplane_ways(putways, index_count, 0, 12);
		get_aeroplane_s3_ways(putways, index_count, 0);
	}
	if (cardslen >= 14)
	{
		get_consecutive_pair_ways(putways, index_count, 0, 14);
	}
	if (cardslen >= 15)
	{
		get_aeroplane_ways(putways, index_count, 0, 15);
		get_aeroplane_l3_ways(putways, index_count, 0);
	}
	if (cardslen >= 16)
	{
		get_consecutive_pair_ways(putways, index_count, 0, 16);
		get_aeroplane_s4_ways(putways, index_count, 0);
	}
	if (cardslen >= 18)
	{
		get_consecutive_pair_ways(putways, index_count, 0, 18);
		get_aeroplane_ways(putways, index_count, 0, 18);
	}
	if (cardslen==20)
	{
		vector<pair<int, int>> card_type = get_cards_type(cards);
		if (card_type.front().first > ERROR_TYPE)
		{
			//如果能一开局一手出完就把牌值放在牌头，前面没有考虑这种情况 
			vector<int> put_cards(cards);
			for (int i = 0; i < cardslen; ++i)
			{
				if (put_cards[i] == card_type.front().second)
				{
					int temp = put_cards[0];
					put_cards[0] = put_cards[i];
					put_cards[i] = temp;
					break;
				}
			}
			putways.push_back(std::move(make_pair(std::move(put_cards), card_type.front().first)));
		}
	}
	return putways;
}

//-----------------------待codereview的代码---------------------------
//////////////////////////////////////////////////////////////////////////
vector<int> NormalAI::get_max_straight(const vector<int>& index_count)
{
	vector<vector<int>> all_straights;
	vector<int> temp_straight;
	for (int i = 1; i < 13; ++i)
	{
		if (index_count[i] >= 1)
		{
			temp_straight.push_back(i);
		}
		else
		{
			if (temp_straight.size() >= 5)
				all_straights.push_back(temp_straight);
			temp_straight.clear();
		}
	}
	if (temp_straight.size() >= 5)
		all_straights.push_back(temp_straight);
	int len = all_straights.size();
	if (len == 0)
	{
		vector<int> empty;
		return empty;
	}
	int max_index = 0;
	for (int i = 0; i < len; ++i)
	{
		if (all_straights[i].size() > all_straights[max_index].size())
			max_index = i;
	}
	return all_straights[max_index];
}

vector<int> NormalAI::get_max_consecutive_pair(const vector<int>& index_count)
{
	vector<vector<int>> all_consecutive_pairs;
	vector<int> temp_consecutive_pairs;
	for (int i = 1; i < 13; ++i)
	{
		if (index_count[i] >= 2)
		{
			temp_consecutive_pairs.push_back(i);
			temp_consecutive_pairs.push_back(i);
		}
		else
		{
			if (temp_consecutive_pairs.size() >= 6)
				all_consecutive_pairs.push_back(temp_consecutive_pairs);
			temp_consecutive_pairs.clear();
		}
	}
	if (temp_consecutive_pairs.size() >= 6)
		all_consecutive_pairs.push_back(temp_consecutive_pairs);
	int len = all_consecutive_pairs.size();
	if (len == 0)
	{
		vector<int> empty;
		return empty;
	}
	int max_index = 0;
	for (int i = 0; i < len; ++i)
	{
		if (all_consecutive_pairs[i].size() > all_consecutive_pairs[max_index].size())
			max_index = i;
	}
	return all_consecutive_pairs[max_index];
}

vector<int> NormalAI::get_max_aeroplane(const vector<int>& index_count)
{
	vector<vector<int>> all_aeroplanes;
	vector<int> temp_aeroplanes;
	for (int i = 1; i < 13; ++i)
	{
		if (index_count[i] >= 3)
		{
			temp_aeroplanes.push_back(i);
			temp_aeroplanes.push_back(i);
			temp_aeroplanes.push_back(i);
		}
		else
		{
			if (temp_aeroplanes.size() >= 6)
				all_aeroplanes.push_back(temp_aeroplanes);
			temp_aeroplanes.clear();
		}
	}
	if (temp_aeroplanes.size() >= 6)
		all_aeroplanes.push_back(temp_aeroplanes);
	int len = all_aeroplanes.size();
	if (len == 0)
	{
		vector<int> empty;
		return empty;
	}
	int max_index = 0;
	for (int i = 0; i < len; ++i)
	{
		if (all_aeroplanes[i].size() > all_aeroplanes[max_index].size())
			max_index = i;
	}
	return all_aeroplanes[max_index];
}

vector<int> NormalAI::get_max_putways(const vector<int>& cards)
{
	if (get_cards_type(cards)[0].first > ERROR_TYPE)
		return cards;
	int cardslen = cards.size();
	std::vector<int> index_count = get_index_count(cards);
	vector<int> max_straight = get_max_straight(index_count);
	vector<int> max_consecutive_pair = get_max_consecutive_pair(index_count);
	vector<int> max_aeroplane = get_max_aeroplane(index_count);
	int straight_len = max_straight.size();
	int consecutive_pair_len = max_consecutive_pair.size() / 2;
	int aeroplane_len = max_aeroplane.size() / 3;
	if (aeroplane_len >= consecutive_pair_len && aeroplane_len >= straight_len && aeroplane_len > 0)
	{
		return max_aeroplane;
	}
	if (consecutive_pair_len >= straight_len && consecutive_pair_len > 0)
	{
		return max_consecutive_pair;
	}
	if (straight_len > 0)
	{
		return max_straight;
	}
	return cards;
}
//-------------------------------------------------------------------------

//////////////////////////////////////////////////////////////////////////
void NormalAI::get_min_aeroplane(vector<int>& index_count, int& find_index, int& back_val)
{
	for (int i = find_index; i < 12; ++i)
	{
		if (index_count[i] >= 3 &&
			index_count[i + 1] >= 3)
		{
			index_count[i] -= 3;
			index_count[i + 1] -= 3;
			back_val = i + 2;
			find_index = i + 2;
			return;
		}
	}
}

void NormalAI::add_trio_to_aeroplane(vector<int>& index_count, int& back_val)
{
	while (index_count[back_val] >= 3)
	{
		index_count[back_val] -= 3;
		++back_val;
		if (back_val>12)
			break;
	}
}

void NormalAI::analyse_aeroplane(vector<int>& index_count)
{
	int aeroplane1_back_val = 0;
	int aeroplane2_back_val = 0;
	int aeroplane3_back_val = 0;
	int find_index = 0;
	get_min_aeroplane(index_count, find_index, aeroplane1_back_val);
	get_min_aeroplane(index_count, find_index, aeroplane2_back_val);
	get_min_aeroplane(index_count, find_index, aeroplane3_back_val);
	if (aeroplane1_back_val != 0)
	{
		add_trio_to_aeroplane(index_count, aeroplane1_back_val);
		if (aeroplane2_back_val != 0)
		{
			add_trio_to_aeroplane(index_count, aeroplane2_back_val);
			if (aeroplane3_back_val != 0)
				add_trio_to_aeroplane(index_count, aeroplane3_back_val);
		}	
	}
	return;
}

void NormalAI::get_min_consecutive_pair(vector<int>& index_count, int& find_index, int& back_val)
{
	for (int i = find_index; i < 11; ++i)
	{
		if (index_count[i] >= 2 &&
			index_count[i + 1] >= 2 &&
			index_count[i + 2] >= 2)
		{
			index_count[i] -= 2;
			index_count[i + 1] -= 2;
			index_count[i + 2] -= 2;
			back_val = i + 3;
			find_index = i;
			break;
		}
	}
}

void NormalAI::add_pair_to_consecutive_pair(vector<int>& index_count, int& back_val)
{
	while (index_count[back_val] >= 2)
	{
		index_count[back_val] -= 2;
		++back_val;
		if (back_val > 12)
			break;
	}
}

void NormalAI::analyse_consecutive_pair(vector<int>& index_count)
{
	int consecutive_pair1_back_val = 0;
	int consecutive_pair2_back_val = 0;
	int consecutive_pair3_back_val = 0;
	int find_index = 0;
	get_min_consecutive_pair(index_count, find_index, consecutive_pair1_back_val);
	get_min_consecutive_pair(index_count, find_index, consecutive_pair2_back_val);
	get_min_consecutive_pair(index_count, find_index, consecutive_pair3_back_val);
	if (consecutive_pair1_back_val != 0)
	{
		add_pair_to_consecutive_pair(index_count, consecutive_pair1_back_val);
		if (consecutive_pair2_back_val != 0)
		{
			add_pair_to_consecutive_pair(index_count, consecutive_pair2_back_val);
			if (consecutive_pair3_back_val != 0)
				add_pair_to_consecutive_pair(index_count, consecutive_pair3_back_val);
		}
	}
	return;
}

void NormalAI::get_min_straight(vector<int>& index_count, int& find_index, int& back_val)
{
	for (int i = find_index; i < 9; ++i)
	{
		if (index_count[i] >= 1 &&
			index_count[i + 1] >= 1 &&
			index_count[i + 2] >= 1 &&
			index_count[i + 3] >= 1 &&
			index_count[i + 4] >= 1)
		{
			index_count[i]--;
			index_count[i + 1]--;
			index_count[i + 2]--;
			index_count[i + 3]--;
			index_count[i + 4]--;
			back_val = i + 5;
			find_index = i;
			break;
		}
	}
}

void NormalAI::add_single_to_straight(vector<int>& index_count, int& back_val)
{
	while (index_count[back_val] >= 1)
	{
		index_count[back_val]--;
		++back_val;
		if (back_val > 12)
			break;
	}
}

void NormalAI::analyse_straight(vector<int>& index_count)
{
	int straight1_back_val = 0;
	int straight2_back_val = 0;
	int straight3_back_val = 0;
	int straight4_back_val = 0;
	int find_index = 0;
	get_min_straight(index_count, find_index, straight1_back_val);
	get_min_straight(index_count, find_index, straight2_back_val);
	get_min_straight(index_count, find_index, straight3_back_val);
	get_min_straight(index_count, find_index, straight4_back_val);
	if (straight1_back_val != 0)
	{
		add_single_to_straight(index_count, straight1_back_val);
		if (straight2_back_val != 0)
		{
			add_single_to_straight(index_count, straight2_back_val);
			if (straight3_back_val != 0)
			{
				add_single_to_straight(index_count, straight3_back_val);
				if (straight4_back_val != 0)
					add_single_to_straight(index_count, straight4_back_val);
			}
		}
	}
	return;
}

int NormalAI::evaluate(const vector<int>& cards)
{
	int scores = 0;
	vector<int> card_index_count = get_index_count(cards);
	//--王炸加分
	if (card_index_count[14] == 1 && card_index_count[15] == 1)
		scores += NUKEVAL;
	//--炸弹加分
	for (int i = 1; i < 16; ++i)
	{
		if (card_index_count[i] == 4)
			scores += CARD_VAL[i][4];
	}
	//--复杂牌型分析并过滤掉
	//////////////////////////////////////////////////////////////////////////
	analyse_aeroplane(card_index_count);
	analyse_straight(card_index_count);
	analyse_consecutive_pair(card_index_count);
	//--最后加上剩余牌的评价值
	for (int i = 1; i < 16; ++i)
	{
		if (card_index_count[i] < 4)
			scores += CARD_VAL[i][card_index_count[i]];
	}
	return scores;
}

//////////////////////////////////////////////////////////////////////////
int NormalAI::get_time()
{
#ifdef WIN32
	clock_t clk = clock();
	return clk * 1000 / CLOCKS_PER_SEC;
#else
	struct timeval now;
	gettimeofday(&now, nullptr);
	return (now.tv_sec * 1000 + now.tv_usec / 1000);
#endif
}

NormalAICardData NormalAI::make_best_way(const pair<vector<int>, int>& way, int val)
{
	NormalAICardData the_data;
	the_data.cards = way.first;
	the_data.cardtype = way.second;
	the_data.cardval = val;
	return the_data;
}

bool NormalAI::is_bomb_or_nuke(const vector<int>& cards)
{
	int cardlen = cards.size();
	if (cardlen == 2)
	{
		if (cards[0] == 14 && cards[1] == 15)
		{
			return true;
		}
	}
	if (cardlen == 4)
	{
		if (cards[0] == cards[1] && cards[1] == cards[2] && cards[2] == cards[3])
		{
			return true;
		}
	}
	return false;
}

NormalAICardData NormalAI::get_put_way(const vector<int>& up_cards, const vector<int>& my_cards, const vector<int>& down_cards, int landlord_index, int presstype, int pressval, int presslen, int press_index, int think_time)
{
	vector<pair<vector<int>, int>> putways;
	if (press_index == 1) // 先手出法 
		putways = get_free_putways(my_cards);
	else // 压牌出法
		putways = get_press_putways(my_cards, presstype, pressval, presslen);

	int putlen = putways.size();
	// 只有一种出法就直接出
	if (putlen == 1)
	{
		NormalAICardData the_data;
		the_data.cards = putways[0].first;
		the_data.cardtype = putways[0].second;
		if (putways[0].first.empty())// 只能pass
			the_data.cardval = 0;
		else
			the_data.cardval = (putways[0].first).front();
		return the_data;
	}
	
	int isfriend = (landlord_index == 0 ? 1 : -1);
	(landlord_index += 2) %= 3;

	// 保存牌值并排序出法
	vector<int> put_way_val;
	for (int i = 0; i < putlen; ++i)
	{
		if (putways[i].first.empty())
		{
			put_way_val.push_back(0);
		}
		else
		{
			put_way_val.push_back(putways[i].first.front());
		}
		sort((putways[i].first).begin(), (putways[i].first).end());
	}

	// 计算每种走法之后剩余的牌
	vector<vector<int>> remain_cards;
	for (int i = 0; i < putlen; ++i)
	{
		if (putways[i].first.empty())
			remain_cards.push_back(vector<int>());
		else
			remain_cards.push_back(subcards(my_cards, putways[i].first));
	}	

	// 计算每种走法是否是炸弹 
	vector<bool> is_put_bomb_or_nuke;
	for (int i = 0; i < putlen; ++i)
	{
		if (putways[i].first.empty())
			is_put_bomb_or_nuke.push_back(false);
		else
			is_put_bomb_or_nuke.push_back(is_bomb_or_nuke(putways[i].first));
	}

	// 搜索方式 : 迭代深化--负极大值
	int best_index = 0;
	m_nStartTime = get_time();
	m_nThinkTime = think_time;
	for (int depth = 5; depth <= 32; depth += 3)
	{
		int temp_best_index = 0;
		int alpha_val = MINVAL;
		int beta_val = MAXVAL;
		for (int i = 0; i < putlen; ++i)
		{
			int temp_press_index = press_index;
			int way_value;
			int base_score = 1;
			if (putways[i].first.empty())
			{
				(temp_press_index += 2) %= 3;
				way_value = isfriend*search_val(my_cards, down_cards, up_cards, landlord_index, presstype, pressval, presslen, temp_press_index, depth, base_score, (landlord_index == 0 ? beta_val : -alpha_val));
			}
			else
			{
				if (is_put_bomb_or_nuke[i])
					base_score *= 2;
				if (remain_cards[i].empty())
				{
					way_value = JUDGEVAL*base_score;
				}
				else
				{
					temp_press_index = 0;
					way_value = isfriend*search_val(remain_cards[i], down_cards, up_cards, landlord_index, putways[i].second, put_way_val[i], putways[i].first.size(), temp_press_index, depth, base_score, (landlord_index == 0 ? beta_val : -alpha_val));
				}
			}
			// 超时返回
			if (way_value == TIMEOUTVAL)
				return make_best_way(putways[best_index], put_way_val[best_index]);
			if (way_value >= alpha_val)
			{
				alpha_val = way_value;
				temp_best_index = i;
			}
		}
		best_index = temp_best_index;
		// 必输直接返回
		if (alpha_val <= -JUDGEVAL)
			return make_best_way(putways[best_index], put_way_val[best_index]);
	}
	return make_best_way(putways[best_index], put_way_val[best_index]);
}

int NormalAI::search_val(const vector<int>& up_cards, const vector<int>& my_cards, const vector<int>& down_cards, int landlord_index, int presstype, int pressval, int presslen, int press_index, int thinkdepth, int base_score, int beta)
{
	if (thinkdepth == 0)
	{
		// 搜索超时则返回中止标记
		if (get_time() - m_nStartTime >= m_nThinkTime)
			return TIMEOUTVAL;
		if (press_index == 1 && get_cards_type(my_cards).front().first > ERROR_TYPE)
			return JUDGEVAL*base_score;
		if (landlord_index == 1)
		{
			return (evaluate(my_cards) - (evaluate(up_cards) + evaluate(down_cards)) / 2);
		}
		else if (landlord_index == 0)
		{
			return ((evaluate(my_cards) + evaluate(down_cards)) / 2 - evaluate(up_cards));
		}
		else
		{
			return ((evaluate(my_cards) + evaluate(up_cards)) / 2 - evaluate(down_cards));
		}
	}
	thinkdepth--;

	vector<pair<vector<int>, int>> putways;
	if (press_index == 1) // 先手出法 
		putways = get_free_putways(my_cards);
	else // 压牌出法
		putways = get_press_putways(my_cards, presstype, pressval, presslen);

	int isfriend = (landlord_index == 0 ? 1 : -1);
	int alpha_val = MINVAL;
	(landlord_index += 2) %= 3;

	int putlen = putways.size();
	// 保存牌值并排序出法
	vector<int> put_way_val;
	put_way_val.reserve(putlen);
	for (int i = 0; i < putlen; ++i)
	{
		if (putways[i].first.empty())
		{
			put_way_val.push_back(0);
		}
		else
		{
			put_way_val.push_back((putways[i].first).front());
			sort((putways[i].first).begin(), (putways[i].first).end());
		}
	}
	
	for (int i = 0; i < putlen; ++i)
	{
		int temp_press_index = press_index;
		int way_value;
		if (putways[i].first.empty())
		{
			(temp_press_index += 2) %= 3;
			way_value = isfriend*search_val(my_cards, down_cards, up_cards, landlord_index, presstype, pressval, presslen, temp_press_index, thinkdepth, base_score, (landlord_index == 0 ? beta : -alpha_val));
		}
		else
		{
			vector<int> remain_card = subcards(my_cards, putways[i].first);
			if (is_bomb_or_nuke(putways[i].first))
				base_score *= 2;
			if (remain_card.empty())
			{
				way_value = JUDGEVAL*base_score;
			}
			else
			{
				temp_press_index = 0;
				way_value = isfriend*search_val(remain_card, down_cards, up_cards, landlord_index, putways[i].second, put_way_val[i], putways[i].first.size(), temp_press_index, thinkdepth, base_score, (landlord_index == 0 ? beta : -alpha_val));
			}
		}
		// 超时剪枝
		if (way_value < MINVAL)
			return way_value;
		// beta剪枝
		if (way_value > beta)
			return way_value;
		if (way_value > alpha_val)
			alpha_val = way_value;
	}
	return alpha_val;
}

//////////////////////////////////////////////////////////////////////////
int NormalAI::Lua_GetTypeNum(const vector<int>& cards, int cardtype)
{
	vector<int> nm_cards = normalizedcards(cards);
	sort(nm_cards.begin(), nm_cards.end());
	int cardslen = cards.size();
	vector<pair<vector<int>, int>> typeways;
	vector<int> index_count = get_index_count(nm_cards);
	vector<pair<int, int>> cardtype_data = get_cards_type(nm_cards);
	if (cardtype_data.front().first == cardtype)
		return 1;
	if (cardtype_data.size() > 1 && cardtype_data[1].first == cardtype)
		return 1;
	int num = 0;
	switch (cardtype)
	{
	case SINGLE_TYPE:
	{
		get_single_ways(typeways, index_count, 0);
		num = typeways.size();
		break;
	}
	case PAIR_TYPE:
	{
		get_pair_ways(typeways, index_count, 0);
		num = typeways.size();
		break;
	}
	case TRIO_TYPE:
	{
		get_trio_ways(typeways, index_count, 0);
		num = typeways.size();
		break;
	}
	case BOMB_TYPE:
	{
		get_bomb_ways(typeways, index_count, 0);
		num = typeways.size();
		break;
	}
	case TRIOSINGLE_TYPE:
	{
		get_trio_1_ways(typeways, index_count, 0);
		if (typeways.size()>0)
			num = 1;
		break;
	}
	case TRIODOUBLE_TYPE:
	{
		get_trio_2_ways(typeways, index_count, 0);
		if (typeways.size() > 0)
			num = 1;
		break;
	}
	case STRAIGHT_TYPE:
	{
		for (int len = 5; len < cardslen; ++len)
		{
			get_straight_ways(typeways, index_count, 0, len);
			if (typeways.size() > 0)
			{
				num = 1;
				break;
			}
		}
		break;
	}
	case CONPAIR_TYPE:
	{
		if (cardslen % 2 == 0)
		{
			for (int len = 6; len < cardslen; ++len)
				get_consecutive_pair_ways(typeways, index_count, 0, len);
		}
		if (typeways.size() > 0)
			num = 1;
		break;
	}
	case AEROPLANE_TYPE:
	{
		if (cardslen % 3 == 0)
		{
			for (int len = 6; len < cardslen; ++len)
				get_aeroplane_ways(typeways, index_count, 0, len);
		}
		if (typeways.size() > 0)
			num = 1;
		break;
	}
	case AEROPLANES_TYPE:
	{
		if (cardslen % 4 == 0 && cardslen >= 8)
		{
			get_aeroplane_s2_ways(typeways, index_count, 0);
			get_aeroplane_s3_ways(typeways, index_count, 0);
			get_aeroplane_s4_ways(typeways, index_count, 0);
		}
		if (typeways.size() > 0)
			num = 1;
		break;
	}
	case AEROPLANEL_TYPE:
	{
		if (cardslen % 5 == 0 && cardslen >= 10)
		{
			get_aeroplane_l2_ways(typeways, index_count, 0);
			get_aeroplane_l3_ways(typeways, index_count, 0);
		}
		if (typeways.size() > 0)
			num = 1;
		break;
	}
	case FOURSINGLE_TYPE:
	{
		get_four_1_ways(typeways, index_count, 0);
		if (typeways.size() > 0)
			num = 1;
		break;
	}
	case FOURDOUBLE_TYPE:
	{
		get_four_2_ways(typeways, index_count, 0);
		if (typeways.size() > 0)
			num = 1;
		break;
	}
	case NUKE_TYPE:
	{
		get_nuke_ways(typeways, index_count);
		num = typeways.size();
		break;
	}
	default:
		break;
	}
	return num;
}

vector<int> NormalAI::Lua_GetMaxWays(const vector<int>& cards)
{
	if (cards.empty())
	{
		vector<int> empty;
		return empty;
	}
	vector<int> nm_cards = normalizedcards(cards);
	vector<int> compare_cards(nm_cards);
	sort(nm_cards.begin(), nm_cards.end());
	vector<int> good_way = get_max_putways(nm_cards);
	int getwayslen = good_way.size();
	int mycardslen = cards.size();
	for (int i = 0; i < getwayslen; ++i)
	{
		for (int k = 0; k < mycardslen; ++k)
		{
			if (good_way[i] == compare_cards[k])
			{
				good_way[i] = cards[k];
				compare_cards[k] = 0;
				break;
			}
		}
	}
	return good_way;
}

vector<vector<int>> NormalAI::Lua_GetTips(const vector<int>& cards, int presstype, int pressval, int presslen)
{
	vector<int> nm_cards = normalizedcards(cards);
	vector<int> index_count = get_index_count(nm_cards);
	vector<vector<int>> ways = get_press_tip_ways(index_count, presstype, pressval, presslen);
	int wayslen = ways.size();
	int cardslen = cards.size();
	for (int i = 0; i < wayslen; ++i)
	{
		int waylen = ways[i].size();
		vector<int> the_cards(nm_cards);
		for (int j = 0; j < waylen; ++j)
		{
			for (int k = 0; k < cardslen; ++k)
			{
				if (ways[i][j] == the_cards[k])
				{
					ways[i][j] = cards[k];
					the_cards[k] = 0;
					break;
				}
			}
		}
	}
	return ways;
}

vector<pair<int, int>> NormalAI::Lua_GetCardType(const vector<int>& cards)
{
	vector<int> nm_cards = normalizedcards(cards);
	sort(nm_cards.begin(), nm_cards.end());
	return get_cards_type(nm_cards);
}

bool NormalAI::Lua_CanPress(const vector<int>& cards, int presstype, int pressval, int presslen)
{
	vector<int> nm_cards = normalizedcards(cards);
	sort(nm_cards.begin(), nm_cards.end());
	return can_press(nm_cards, presstype, pressval, presslen);
}

NormalAICardData NormalAI::Lua_GetPutWays(const vector<int>& up_cards, const vector<int>& my_cards, const vector<int>& down_cards, int landlord_index, int presstype, int pressval, int presslen, int press_index, int think_time)
{
	vector<int> nm_up_cards = normalizedcards(up_cards);
	sort(nm_up_cards.begin(), nm_up_cards.end());

	vector<int> nm_mycards = normalizedcards(my_cards);
	vector<int> compare_cards(nm_mycards);
	sort(nm_mycards.begin(), nm_mycards.end());

	vector<int> nm_down_cards = normalizedcards(down_cards);
	sort(nm_down_cards.begin(), nm_down_cards.end());

	NormalAICardData putway_data = get_put_way(nm_up_cards, nm_mycards, nm_down_cards, landlord_index, presstype, pressval, presslen, press_index, think_time);
	int putwaylen = putway_data.cards.size();
	int mycardslen = my_cards.size();
	for (int i = 0; i < putwaylen; ++i)
	{
		for (int k = 0; k < mycardslen; ++k)
		{
			if (putway_data.cards[i] == compare_cards[k])
			{
				putway_data.cards[i] = my_cards[k];
				compare_cards[k] = 0;
				break;
			}
		}
	}
	return putway_data;
}

