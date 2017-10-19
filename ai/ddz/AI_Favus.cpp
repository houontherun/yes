#include "AI_Favus.h"

bool FavusAI::can_press(const vector<int>& cards, int presstype, int pressval, int presslen, int favus)
{
	vector<FavusCardData> card_type = get_cards_type(cards, favus);
	int card_type_len = card_type.size();
	for (int i = 0; i < card_type_len; ++i)
	{
		if (card_type[i].cardtype != ERROR_TYPE)
		{
			if (card_type[i].cardtype >= FAVUS_BOMB_TYPE && card_type[i].cardtype > presstype)
			{
				return true;
			}
			if (card_type[i].cardtype == presstype && card_type[i].cardval > pressval && cards.size() == presslen)
			{
				return true;
			}
		}
	}
	return false;
}

vector<FavusCardData> FavusAI::get_cards_type(const vector<int>& cards, int favus)
{
	vector<FavusCardData> alltype;
	int cardslen = cards.size();
	int favus_count = 0;
	vector<int> nofavuscards;
	for (int i = 0; i < cardslen; ++i)
	{
		if (cards[i] == favus)
		{
			favus_count++;
		}
		else
		{
			nofavuscards.push_back(cards[i]);
		}
	}
	if (nofavuscards.empty())
	{
		FavusCardData temp_data;
		temp_data.cardval = favus;
		switch (favus_count)
		{
		case 1:
		{
			temp_data.cardtype = SINGLE_TYPE;
			alltype.push_back(std::move(temp_data));
			break;
		}
		case 2:
		{
			temp_data.cardtype = PAIR_TYPE;
			alltype.push_back(std::move(temp_data));
			break;
		}
		case 3:
		{
			temp_data.cardtype = TRIO_TYPE;
			alltype.push_back(std::move(temp_data));
			break;
		}
		case 4:
		{
			temp_data.cardtype = ALLFAVUS_BOMB_TYPE;
			alltype.push_back(std::move(temp_data));
			break;
		}
		default:
			break;
		}
	}
	else
	{
		if (favus_count == 0)
		{
			//无癞子牌
			FavusCardData temp_data;
			vector<pair<int, int>> normaldata = NormalAI::get_cards_type(nofavuscards);
			temp_data.cardtype = normaldata[0].first;
			temp_data.cardval = normaldata[0].second;
			alltype.push_back(std::move(temp_data));
			if (normaldata.size()>1)
			{
				FavusCardData temp_data2;
				temp_data2.cardtype = normaldata[1].first;
				temp_data2.cardval = normaldata[1].second;
				alltype.push_back(std::move(temp_data2));
			}
		}
		else
		{
			//癞子组合牌型处理
			alltype = get_favus_cards_type(nofavuscards, favus, favus_count);
		}
	}
	if (alltype.empty())
	{
		FavusCardData temp_data;
		temp_data.cardtype = ERROR_TYPE;
		temp_data.cardval = 0;
		alltype.push_back(std::move(temp_data));
	}
	return alltype;
}

void FavusAI::addFavusCardData(vector<FavusCardData>& the_data, int cardtype, int cardval, const vector<int>& fcards)
{
	FavusCardData temp_data;
	temp_data.cardtype = cardtype;
	temp_data.cardval = cardval;
	temp_data.favuscards = fcards;
	the_data.push_back(std::move(temp_data));
}

vector<FavusCardData> FavusAI::get_favus_cards_type(const vector<int>& cards, int favus, int favus_count)
{
	vector<FavusCardData> alltypes;
	int cardslen = cards.size() + favus_count;
	switch (cardslen)
	{
	case 2:
	{
		if (cards[0] < 14)
			addFavusCardData(alltypes, PAIR_TYPE, cards[0], vector<int>(favus_count, cards[0]));
		break;
	}
	case 3:
	{
		if ((favus_count == 2 && cards[0] < 14) || (favus_count == 1 && cards[0] == cards[1]))
			addFavusCardData(alltypes, TRIO_TYPE, cards[0], vector<int>(favus_count, cards[0]));
		break;
	}
	case 4:
	{
		if (favus_count == 3)
		{
			if (cards[0] < 14)
				addFavusCardData(alltypes, FAVUS_BOMB_TYPE, cards[0], vector<int>(favus_count, cards[0]));
			else
				addFavusCardData(alltypes, TRIOSINGLE_TYPE, favus, vector<int>());
		}
		else if (favus_count == 2)
		{
			if (cards[0] == cards[1])
			{
				addFavusCardData(alltypes, FAVUS_BOMB_TYPE, cards[0], vector<int>(favus_count, cards[0]));
			}
			else
			{
				if (cards[0] < 14 && cards[1] < 14)
				{
					addFavusCardData(alltypes, TRIOSINGLE_TYPE, cards[1], vector<int>(2, cards[1]));
				}
				else if (cards[0] < 14 && cards[1] >= 14)
				{
					addFavusCardData(alltypes, TRIOSINGLE_TYPE, cards[0], vector<int>(2, cards[0]));
				}
			}
		}
		else if (favus_count == 1)
		{
			if (cards[0] == cards[1] && cards[1] == cards[2])
			{
				addFavusCardData(alltypes, FAVUS_BOMB_TYPE, cards[0], vector<int>(favus_count, cards[0]));
			}
			else
			{
				if (cards[0] == cards[1] && cards[1] != cards[2])
					addFavusCardData(alltypes, TRIOSINGLE_TYPE, cards[0], vector<int>(favus_count, cards[0]));
				if (cards[0] != cards[1] && cards[1] == cards[2])
					addFavusCardData(alltypes, TRIOSINGLE_TYPE, cards[1], vector<int>(favus_count, cards[1]));
			}
		}
		break;
	}
	case 5:
	{
		if (favus_count == 4)
		{
			if (cards[0] < 14)
				addFavusCardData(alltypes, TRIODOUBLE_TYPE, favus, vector<int>(1, cards[0]));
		}
		else if (favus_count == 3)
		{
			if (cards[0] == cards[1])
			{
				if (cards[0] > favus)
					addFavusCardData(alltypes, TRIODOUBLE_TYPE, cards[0], vector<int>(1, cards[0]));
				else
					addFavusCardData(alltypes, TRIODOUBLE_TYPE, favus, vector<int>());
			}
			else
			{
				if (cards[1] < 14)
				{
					vector<int> favus_replace_cards = { cards[0], cards[1], cards[1] };
					addFavusCardData(alltypes, TRIODOUBLE_TYPE, cards[1], favus_replace_cards);
				}
			}
		}
		else if (favus_count == 2)
		{
			if (cards[0] == cards[1] && cards[1] == cards[2])
				addFavusCardData(alltypes, TRIODOUBLE_TYPE, cards[0], vector<int>());
			if (cards[0] == cards[1] && cards[1] != cards[2] && cards[2] < 14)
				addFavusCardData(alltypes, TRIODOUBLE_TYPE, cards[2], vector<int>(favus_count, cards[2]));
			if (cards[0] != cards[1] && cards[1] == cards[2])
			{
				vector<int> favus_replace_cards = { cards[0], cards[1] };
				addFavusCardData(alltypes, TRIODOUBLE_TYPE, cards[1], favus_replace_cards);
			}
		}
		else if (favus_count == 1)
		{
			if (cards[0] == cards[1] && cards[1] != cards[2] && cards[2] == cards[3])
				addFavusCardData(alltypes, TRIODOUBLE_TYPE, cards[2], vector<int>(favus_count, cards[2]));
			if (cards[0] != cards[1] && cards[1] == cards[2] && cards[2] == cards[3])
				addFavusCardData(alltypes, TRIODOUBLE_TYPE, cards[1], vector<int>(favus_count, cards[0]));
			if (cards[0] == cards[1] && cards[1] == cards[2] && cards[2] != cards[3] && cards[3] < 14)
				addFavusCardData(alltypes, TRIODOUBLE_TYPE, cards[0], vector<int>(favus_count, cards[3]));
		}
		break;
	}
	case 6:
	{
		add_four_single_type(alltypes, cards, favus, favus_count);
		break;
	}
	case 8:
	{
		add_aeroplane_small_type(alltypes, cards, favus_count, 2);
		add_four_double_type(alltypes, cards, favus, favus_count);
		break;
	}
	case 10:
	{
		add_aeroplane_large_type(alltypes, cards, favus_count, 2);
		break;
	}
	case 12:
	{
		add_aeroplane_small_type(alltypes, cards, favus_count, 3);
		break;
	}
	case 15:
	{
		add_aeroplane_large_type(alltypes, cards, favus_count, 3);
		break;
	}
	case 16:
	{
		add_aeroplane_small_type(alltypes, cards, favus_count, 4);
		break;
	}
	case 20:
	{
		add_aeroplane_large_type(alltypes, cards, favus_count, 4);
		add_aeroplane_small_type(alltypes, cards, favus_count, 5);
		break;
	}
	default:
		break;
	}
	if (cardslen >= 5 && cardslen <= 12)
		add_straight_type(alltypes, cards, favus_count);
	if (cardslen % 2 == 0 && cardslen >= 6 && cardslen<=20)
		add_consecutive_pair_type(alltypes, cards, favus_count);
	if (cardslen % 3 == 0 && cardslen >= 6 && cardslen <= 18)
		add_aeroplane_type(alltypes, cards, favus_count);
	return alltypes;
}

void FavusAI::add_straight_type(vector<FavusCardData>& the_data, const vector<int>& cards, int favus_count)
{
	if (cards.back() >= 13)
		return;
	int cardslen = cards.size();
	int inner_need_count = cards.back() - cards.front() + 1 - cardslen;
	if (inner_need_count < 0 || inner_need_count > favus_count)
		return;
	vector<int> index_count = get_index_count(cards);
	for (int i = cards.front(); i <= cards.back(); ++i)
	{
		if (index_count[i] > 1)
			return;
	}
	vector<int> favus_replace_cards;
	if (inner_need_count != 0)
	{
		int favus_replace_pos = 1;
		for (int i = cards.front() + 1; i < cards.back(); ++i)
		{
			if (cards[favus_replace_pos] != i)
			{
				favus_replace_cards.push_back(i);
			}
			else
			{
				favus_replace_pos++;
			}
		}
	}
	if (inner_need_count == favus_count)
		addFavusCardData(the_data, STRAIGHT_TYPE, cards.front(), favus_replace_cards);
	else
	{
		int after_add_inner_remain_favus_count = favus_count - inner_need_count;
		int add_bigger_count = 12 - cards.back();
		if (after_add_inner_remain_favus_count <= add_bigger_count)
		{
			for (int k = cards.back() + 1; k <= cards.back() + after_add_inner_remain_favus_count; ++k)
				favus_replace_cards.push_back(k);
			addFavusCardData(the_data, STRAIGHT_TYPE, cards.front(), favus_replace_cards);
		}
		else
		{
			int after_add_bigger_remain_favus_count = after_add_inner_remain_favus_count - add_bigger_count;
			int add_smaller_count = cards[0] - 1;
			if (after_add_bigger_remain_favus_count <= add_smaller_count)
			{
				for (int k = cards.back() + 1; k <= 12; ++k)
					favus_replace_cards.push_back(k);
				for (int k = cards.front() - 1; k >= cards.front() - after_add_bigger_remain_favus_count; --k)
					favus_replace_cards.push_back(k);
				addFavusCardData(the_data, STRAIGHT_TYPE, (cards.front() - after_add_bigger_remain_favus_count), favus_replace_cards);
			}
		}
	}
}

void FavusAI::add_consecutive_pair_type(vector<FavusCardData>& the_data, const vector<int>& cards, int favus_count)
{
	if (cards.back() >= 13)
		return;
	int cardslen = cards.size();
	int inner_need_count = (cards.back() - cards.front() + 1) * 2 - cardslen;
	if (inner_need_count < 0 || inner_need_count > favus_count)
		return;
	vector<int> index_count = get_index_count(cards);
	for (int i = cards.front(); i <= cards.back(); ++i)
	{
		if (index_count[i] > 2)
			return;
	}
	vector<int> favus_replace_cards;
	if (inner_need_count != 0)
	{
		for (int i = cards.front(); i <= cards.back(); ++i)
		{
			if (index_count[i] == 0)
			{
				favus_replace_cards.push_back(i);
				favus_replace_cards.push_back(i);
			}
			else if (index_count[i] == 1)
			{
				favus_replace_cards.push_back(i);
			}
		}
	}
	if (inner_need_count == favus_count)
		addFavusCardData(the_data, CONPAIR_TYPE, cards.front(), favus_replace_cards);
	else
	{
		int after_add_inner_remain_favus_count = favus_count - inner_need_count;
		if (after_add_inner_remain_favus_count % 2 == 1)
			return;
		int add_bigger_count = 12 - cards.back();
		if (after_add_inner_remain_favus_count <= add_bigger_count * 2)
		{
			for (int k = cards.back() + 1; k <= cards.back() + after_add_inner_remain_favus_count / 2; ++k)
			{
				favus_replace_cards.push_back(k);
				favus_replace_cards.push_back(k);
			}
			addFavusCardData(the_data, CONPAIR_TYPE, cards.front(), favus_replace_cards);
		}
		else
		{
			int after_add_bigger_remain_favus_count = after_add_inner_remain_favus_count - add_bigger_count;
			if (after_add_bigger_remain_favus_count % 2 == 1)
				return;
			int add_smaller_count = cards[0] - 1;
			if (after_add_bigger_remain_favus_count <= add_smaller_count * 2)
			{
				for (int k = cards.back() + 1; k <= 12; ++k)
				{
					favus_replace_cards.push_back(k);
					favus_replace_cards.push_back(k);
				}
				for (int k = cards.front() - 1; k >= cards.front() - after_add_bigger_remain_favus_count / 2; --k)
				{
					favus_replace_cards.push_back(k);
					favus_replace_cards.push_back(k);
				}
				addFavusCardData(the_data, CONPAIR_TYPE, cards.front() - after_add_bigger_remain_favus_count / 2, favus_replace_cards);
			}
		}
	}
}

void FavusAI::add_aeroplane_type(vector<FavusCardData>& the_data, const vector<int>& cards, int favus_count)
{
	if (cards.back() >= 13)
		return;
	int cardslen = cards.size();
	int inner_need_count = (cards.back() - cards.front() + 1) * 3 - cardslen;
	if (inner_need_count < 0 || inner_need_count > favus_count)
		return;
	vector<int> index_count = get_index_count(cards);
	for (int i = cards.front(); i <= cards.back(); ++i)
	{
		if (index_count[i] > 3)
			return;
	}
	vector<int> favus_replace_cards;
	if (inner_need_count != 0)
	{
		for (int i = cards.front(); i <= cards.back(); ++i)
		{
			if (index_count[i] == 0)
			{
				favus_replace_cards.push_back(i);
				favus_replace_cards.push_back(i);
				favus_replace_cards.push_back(i);
			}
			else if (index_count[i] == 1)
			{
				favus_replace_cards.push_back(i);
				favus_replace_cards.push_back(i);
			}
			else if (index_count[i] == 2)
			{
				favus_replace_cards.push_back(i);
			}
		}
	}
	if (inner_need_count == favus_count)
		addFavusCardData(the_data, AEROPLANE_TYPE, cards.front(), favus_replace_cards);
	else if (inner_need_count < favus_count)
	{
		int after_add_inner_remain_favus_count = favus_count - inner_need_count;
		if (after_add_inner_remain_favus_count != 3)
			return;
		if (cards.back() < 12)
		{
			favus_replace_cards.push_back(cards.back() + 1);
			favus_replace_cards.push_back(cards.back() + 1);
			favus_replace_cards.push_back(cards.back() + 1);
			addFavusCardData(the_data, AEROPLANE_TYPE, cards.front(), favus_replace_cards);
		}
		else
		{
			favus_replace_cards.push_back(cards.front() - 1);
			favus_replace_cards.push_back(cards.front() - 1);
			favus_replace_cards.push_back(cards.front() - 1);
			addFavusCardData(the_data, AEROPLANE_TYPE, cards.front() - 1, favus_replace_cards);
		}
	}
}

void FavusAI::add_aeroplane_small_type(vector<FavusCardData>& the_data, const vector<int>& cards, int favus_count, int num)
{
	vector<int> index_count = get_index_count(cards);
	int maxIndex = std::min(12, cards.back() + 1);
	int minIndex = std::max(num, cards.front());
	for (int i = maxIndex; i >= minIndex; i--)
	{
		int needcount = 0;
		vector<int> favus_replace_cards;
		for (int k = i; k > i - num; --k)
		{
			if (index_count[k] < 3)
			{
				needcount += (3 - index_count[k]);
				favus_replace_cards.insert(favus_replace_cards.end(), (3 - index_count[k]), k);
			}
		}
		if (needcount <= favus_count)
		{
			addFavusCardData(the_data, AEROPLANES_TYPE, (i - num + 1), favus_replace_cards);
			return;
		}
	}
}

void FavusAI::add_aeroplane_large_type(vector<FavusCardData>& the_data, const vector<int>& cards, int favus_count, int num)
{
	if (cards.back() > 13)
		return;
	vector<int> index_count = get_index_count(cards);
	int maxIndex = std::min(12, cards.back() + 1);
	int minIndex = std::max(num, cards.front());
	for (int i = maxIndex; i >= minIndex; i--)
	{
		int needcount = 0;
		for (int k = i; k > i - num; --k)
		{
			if (index_count[k] < 3)
				needcount += (3 - index_count[k]);
		}
		if (needcount <= favus_count)
		{
			int remain_favus_count = favus_count - needcount;
			vector<int> favus_replace_cards;
			favus_replace_cards.reserve(favus_count);
			for (int k = i; k > i - num; --k)
			{
				if (index_count[k] < 3)
				{
					favus_replace_cards.insert(favus_replace_cards.end(), (3 - index_count[k]), k);
				}
				else if (index_count[k] == 4)
				{
					remain_favus_count--;
					favus_replace_cards.push_back(k);
				}
			}
			for (int k = cards.front(); k <= (i - num); ++k)
			{
				if (index_count[k] % 2 == 1)
				{
					remain_favus_count--;
					favus_replace_cards.push_back(k);
				}
			}
			for (int k = i + 1; k <= cards.back(); ++k)
			{
				if (index_count[k] % 2 == 1)
				{
					remain_favus_count--;
					favus_replace_cards.push_back(k);
				}	
			}
			//能组成4带两个对子 
			if (remain_favus_count >= 0 && remain_favus_count % 2 == 0)
			{
				addFavusCardData(the_data, AEROPLANEL_TYPE, (i - num + 1), favus_replace_cards);
				return;
			}
		}
	}
}

void FavusAI::add_four_single_type(vector<FavusCardData>& the_data, const vector<int>& cards, int favus, int favus_count)
{
	vector<int> index_count = get_index_count(cards);
	int maxIndex = std::min(13, cards.back());
	if (maxIndex < favus && favus_count == 4)
		addFavusCardData(the_data, FOURSINGLE_TYPE, favus, vector<int>());
	for (int i = maxIndex; i >= cards.front(); --i)
	{
		if (index_count[i] > 0 && index_count[i] + favus_count >= 4)
		{
			vector<int> favus_replace_cards(4 - index_count[i],i);
			addFavusCardData(the_data, FOURSINGLE_TYPE, i, favus_replace_cards);
			return;
		}
	}
}

void FavusAI::add_four_double_type(vector<FavusCardData>& the_data, const vector<int>& cards, int favus, int favus_count)
{
	if (cards.back() > 13)
		return;
	vector<int> index_count = get_index_count(cards);
	if (cards.back() < favus && favus_count == 4)
	{
		//可能为以癞子为牌值的4带两队
		bool is_favus_four_double_type = true;
		for (int i = cards.front(); i < cards.back(); ++i)
		{
			if (index_count[i] % 2 == 1)
			{
				is_favus_four_double_type = false;
				break;
			}
		}
		if (is_favus_four_double_type)
		{
			addFavusCardData(the_data, FOURDOUBLE_TYPE, favus, vector<int>());
			return;
		}
	}
	for (int i = cards.back(); i >= cards.front(); --i)
    {
		if (index_count[i] > 0 && index_count[i] + favus_count >= 4)
		{
			int remain_favus_count = index_count[i] + favus_count - 4;
			vector<int> favus_replace_cards(4 - index_count[i], i);
			for (int k = cards.front(); k < cards.back(); ++k)
			{
				if (index_count[k] % 2 == 1 && k != i)
				{
					remain_favus_count--;
					favus_replace_cards.push_back(k);
				}
			}
			if (remain_favus_count >= 0 && remain_favus_count % 2 == 0)
			{
				addFavusCardData(the_data, FOURDOUBLE_TYPE, i, favus_replace_cards);
				return;
			}
		}
	}
}

//////////////////////////////////////////////////////////////////////////
vector<vector<int>> FavusAI::get_press_tip_ways(const vector<int>& cards, int presstype, int pressval, int presslen, int favus)
{
	pair<vector<int>, int> the_data = get_index_count_favus(cards,favus);
	if (the_data.second <= 0)
		return NormalAI::get_press_tip_ways(the_data.first, presstype, pressval, presslen);
	vector<vector<int>> putways;
	if (presstype >= FAVUS_BOMB_TYPE)
	{
		switch (presstype)
		{
		case NUKE_TYPE:
			return putways;
		case FAVUS_BOMB_TYPE:
			get_tip_favus_bomb_cards(putways, the_data.first, pressval, favus, the_data.second);
			NormalAI::get_tip_bomb_cards(putways, the_data.first, 0);
			NormalAI::get_tip_nuke_cards(putways, the_data.first);
			break;
		case BOMB_TYPE:
			NormalAI::get_tip_bomb_cards(putways, the_data.first, pressval);
			get_tip_all_favus_bomb_cards(putways, favus, the_data.second);
            // fallthrough
		case ALLFAVUS_BOMB_TYPE:
			NormalAI::get_tip_nuke_cards(putways, the_data.first);
		default:
			break;
		}
	}
	else
	{
		// 先找是否有软炸弹以便在普通牌型判断时使用
		vector<vector<int>> put_bomb_ways;
		get_tip_favus_bomb_cards(put_bomb_ways, the_data.first, 0, favus, the_data.second);
		bool havebomb = (!put_bomb_ways.empty() || the_data.second == 4);
		switch (presstype)
		{
		case SINGLE_TYPE:
		{
			get_tip_single_cards(putways, the_data.first, pressval, favus, the_data.second, havebomb);
			break;
		}
		case PAIR_TYPE:
		{
			get_tip_pair_cards(putways, the_data.first, pressval, favus, the_data.second, havebomb);
			break;
		}
		case TRIO_TYPE:
		{
			get_tip_trio_cards(putways, the_data.first, pressval, favus, the_data.second, havebomb);
			break;
		}
		case TRIOSINGLE_TYPE:
		{
			get_tip_trio_1_cards(putways, the_data.first, pressval, favus, the_data.second, havebomb);
			break;
		}
		case TRIODOUBLE_TYPE:
		{
			get_tip_trio_2_cards(putways, the_data.first, pressval, favus, the_data.second, havebomb);
			break;
		}
		case STRAIGHT_TYPE:
		{
			get_tip_straight_cards(putways, the_data.first, pressval, presslen, favus, the_data.second);
			break;
		}
		case CONPAIR_TYPE:
		{
			get_tip_consecutive_pair_cards(putways, the_data.first, pressval, presslen, favus, the_data.second);
			break;
		}
		case AEROPLANE_TYPE:
		{
			get_tip_aeroplane_cards(putways, the_data.first, pressval, presslen, favus, the_data.second);
			break;
		}
		case AEROPLANES_TYPE:
		{
			get_tip_aeroplane_s_cards(putways, the_data.first, pressval, presslen, favus, the_data.second);
			break;
		}
		case AEROPLANEL_TYPE:
		{
			get_tip_aeroplane_l_cards(putways, the_data.first, pressval, presslen, favus, the_data.second);
			break;
		}
		case FOURSINGLE_TYPE:
		{
			get_tip_four_1_cards(putways, the_data.first, pressval, favus, the_data.second);
			break;
		}
		case FOURDOUBLE_TYPE:
		{
			get_tip_four_2_cards(putways, the_data.first, pressval, favus, the_data.second);
			break;
		}
		default:
			break;
		}
		putways.insert(putways.end(), put_bomb_ways.begin(), put_bomb_ways.end());
		NormalAI::get_tip_bomb_cards(putways, the_data.first, 0);
		get_tip_all_favus_bomb_cards(putways, favus, the_data.second);
		NormalAI::get_tip_nuke_cards(putways, the_data.first);
	}
	return putways;
}

void FavusAI::get_tip_single_cards(vector<vector<int>>& ways, const vector<int>& index_count, int pressval, int favus, int favus_count, bool havebomb)
{
	for (int i = pressval + 1; i < 16; ++i)
	{
		if (index_count[i] == 1)
		{
			vector<int> way(1, i);
			ways.push_back(std::move(way));
		}
	}
	if (favus_count == 1)//无法和对子牌组成癞子炸弹，则考虑拆对子牌
	{
		for (int i = pressval + 1; i < 14; ++i)
		{
			if (index_count[i] == 2)
			{
				vector<int> way(1, i);
				ways.push_back(std::move(way));
			}
		}
	}
	if (ways.empty() && !havebomb)
	{
		if (favus > pressval)
		{
			vector<int> way(1, favus);
			ways.push_back(std::move(way));
		}
	}
}

void FavusAI::get_tip_pair_cards(vector<vector<int>>& ways, const vector<int>& index_count, int pressval, int favus, int favus_count, bool havebomb)
{
	for (int i = pressval + 1; i < 14; ++i)
	{
		if (index_count[i] == 2)
		{
			vector<int> way(2, i);
			ways.push_back(std::move(way));
		}
	}
	for (int i = pressval + 1; i < 14; ++i)
	{
		if (index_count[i] == 1)
		{
			vector<int> way = { i, favus };
			ways.push_back(std::move(way));
		}
	}
	if (ways.empty() && !havebomb)
	{
		if (favus > pressval && favus_count>=2)
		{
			vector<int> way(2, favus);
			ways.push_back(std::move(way));
		}
	}
}

void FavusAI::get_tip_trio_cards(vector<vector<int>>& ways, const vector<int>& index_count, int pressval, int favus, int favus_count, bool havebomb)
{
	bool havetrio = false;
	for (int i = pressval + 1; i < 14; ++i)
	{
		if (index_count[i] == 3)
		{
			havetrio = true;
			vector<int> way(3, i);
			ways.push_back(std::move(way));
		}
	}
	for (int i = pressval + 1; i < 14; ++i)
	{
		if (index_count[i] == 2)
		{
			vector<int> way = { i, i, favus };
			ways.push_back(std::move(way));
		}
	}
	if (!havetrio && favus_count >= 2)
	{
		for (int i = pressval + 1; i < 14; ++i)
		{
			if (index_count[i] == 1)
			{
				vector<int> way = { i, favus, favus };
				ways.push_back(std::move(way));
			}
		}
	}
	if (ways.empty() && !havebomb)
	{
		if (favus_count == 3 && favus > pressval)
		{
			vector<int> way(3, favus);
			ways.push_back(std::move(way));
		}
	}
}

void FavusAI::get_tip_trio_1_cards(vector<vector<int>>& ways, const vector<int>& index_count, int pressval, int favus, int favus_count, bool havebomb)
{
	vector<vector<int>> temp_trio_ways;
	get_tip_trio_cards(temp_trio_ways, index_count, pressval, favus, favus_count, havebomb);
	int wayslen = temp_trio_ways.size();
	for (int i = 0; i < wayslen; ++i)
	{
		bool founded = false;
		for (int count = 1; count < 4; ++count)
		{
			for (int j = 1; j < 16; j++)
			{
				if (index_count[j] == count && j != temp_trio_ways[i][0])
				{
					temp_trio_ways[i].push_back(j);
					founded = true;
					break;
				}
			}
			if (founded)
				break;
		}
		if (!founded)
			return;
	}
	if (!temp_trio_ways.empty())
		ways.insert(ways.end(), temp_trio_ways.begin(), temp_trio_ways.end());
}

void FavusAI::get_tip_trio_2_cards(vector<vector<int>>& ways, const vector<int>& index_count, int pressval, int favus, int favus_count, bool havebomb)
{
	vector<vector<int>> temp_trio_ways;
	get_tip_trio_cards(temp_trio_ways, index_count, pressval, favus, favus_count, havebomb);
	int wayslen = temp_trio_ways.size();
	for (int i = 0; i < wayslen; ++i)
	{
		bool founded = false;
		for (int count = 2; count < 4; ++count)
		{
			for (int j = 1; j < 14; j++)
			{
				if (index_count[j] == count && j != temp_trio_ways[i][0])
				{
					temp_trio_ways[i].push_back(j);
					temp_trio_ways[i].push_back(j);
					founded = true;
					break;
				}
			}
			if (founded)
				break;
		}
		if (!founded)
		{
            // 考虑带的对子有癞子情况
			int used_favus_count = 0;
			for (int k = 0; k < 3; ++k)
			{
				if (temp_trio_ways[i][k] == favus)
					used_favus_count++;
			}
			if (used_favus_count<favus_count)// 还有癞子
			{
				bool foundwinged = false;
				for (int j = 1; j < 14; j++)
				{
					if (index_count[j] == 1 && j != temp_trio_ways[i][0])
					{
						temp_trio_ways[i].push_back(j);
						temp_trio_ways[i].push_back(favus);
						foundwinged = true;
						break;
					}
				}
				if (!foundwinged)
				{
					if (favus_count - used_favus_count >= 2)//直接带两个癞子作为翅膀
					{
						temp_trio_ways[i].push_back(favus);
						temp_trio_ways[i].push_back(favus);
					}
					else
					{
						return;
					}
				}
			}
			else
			{
				return;
			}
		}
	}
	if (!temp_trio_ways.empty())
		ways.insert(ways.end(), temp_trio_ways.begin(), temp_trio_ways.end());
}

void FavusAI::get_tip_straight_cards(vector<vector<int>>& ways, const vector<int>& index_count, int pressval, int len, int favus, int favus_count)
{
	if (pressval + len >= 13)
		return;
	NormalAI::get_tip_straight_cards(ways, index_count, pressval, len);
	if (ways.empty())
	{
		int can_use_favus_count = 1;
		while (ways.empty())
		{
			for (int pv = pressval + 1; pv <= 13 - len; pv++)
			{
				bool founded = true;
				int need_count = 0;
				vector<int> way;
				for (int i = pv; i < pv + len; ++i)
				{
					if (index_count[i] == 0)
					{
						need_count++;
						if (need_count > can_use_favus_count)
						{
							founded = false;
							break;
						}
						way.push_back(favus);
					}
					else
					{
						way.push_back(i);
					}
				}
				if (founded)
					ways.push_back(std::move(way));
			}
			can_use_favus_count++;
			if (can_use_favus_count>favus_count)
				break;
		}
	}
}

void FavusAI::get_tip_consecutive_pair_cards(vector<vector<int>>& ways, const vector<int>& index_count, int pressval, int len, int favus, int favus_count)
{
	if (pressval + len / 2 >= 13)
		return;
	NormalAI::get_tip_consecutive_pair_cards(ways, index_count, pressval, len);
	if (ways.empty())
	{
		int can_use_favus_count = 1;
		int reallen = len / 2;
		while (ways.empty())
		{
			for (int pv = pressval + 1; pv <= 13 - reallen; pv++)
			{
				bool founded = true;
				int need_count = 0;
				vector<int> way;
				for (int i = pv; i < pv + reallen; ++i)
				{
					if (index_count[i] == 4)//连对不能拆炸弹
					{
						pv = i;
						founded = false;
						break;
					}
					if (index_count[i] < 2)
					{
						need_count += (2 - index_count[i]);
						if (need_count > can_use_favus_count)
						{
							founded = false;
							break;
						}
						if (index_count[i]==0)
						{
							way.push_back(favus);
							way.push_back(favus);
						}
						else if (index_count[i]==1)
						{
							way.push_back(i);
							way.push_back(favus);
						}
					}
					else
					{
						way.push_back(i);
						way.push_back(i);
					}
				}
				if (founded)
					ways.push_back(std::move(way));
			}
			can_use_favus_count++;
			if (can_use_favus_count > favus_count)
				break;
		}
	}
}

void FavusAI::get_tip_aeroplane_cards(vector<vector<int>>& ways, const vector<int>& index_count, int pressval, int len, int favus, int favus_count)
{
	if (pressval + len / 3 >= 13)
		return;
	NormalAI::get_tip_aeroplane_cards(ways, index_count, pressval, len);
	if (ways.empty())
	{
		int can_use_favus_count = 1;
		int reallen = len / 3;
		while (ways.empty())
		{
			for (int pv = pressval + 1; pv <= 13 - reallen; pv++)
			{
				bool founded = true;
				int need_count = 0;
				vector<int> way;
				for (int i = pv; i < pv + reallen; ++i)
				{
					if (index_count[i] < 3)
					{
						need_count += (3 - index_count[i]);
						if (need_count > can_use_favus_count)
						{
							founded = false;
							break;
						}
						if (index_count[i] == 0)
						{
							way.push_back(favus);
							way.push_back(favus);
							way.push_back(favus);
						}
						else if (index_count[i] == 1)
						{
							way.push_back(i);
							way.push_back(favus);
							way.push_back(favus);
						}
						else if (index_count[i] == 2)
						{
							way.push_back(i);
							way.push_back(i);
							way.push_back(favus);
						}
					}
					else
					{
						way.push_back(i);
						way.push_back(i);
						way.push_back(i);
					}
				}
				if (founded)
					ways.push_back(std::move(way));
			}
			can_use_favus_count++;
			if (can_use_favus_count > favus_count)
				break;
		}
	}
}

void FavusAI::get_tip_aeroplane_s_cards(vector<vector<int>>& ways, const vector<int>& index_count, int pressval, int len, int favus, int favus_count)
{
	if (len > 16)
		return;
	if (pressval + len / 4 >= 13)
		return;
	NormalAI::get_tip_aeroplane_s_cards(ways, index_count, pressval, len);
	if (ways.empty())
	{
		int can_use_favus_count = 1;
		int reallen = len / 3;
		while (ways.empty())
		{
			for (int pv = pressval + 1; pv <= 13 - reallen; pv++)
			{
				bool founded = true;
				int need_count = 0;
				vector<int> way;
				for (int i = pv; i < pv + reallen; ++i)
				{
					if (index_count[i] < 3)
					{
						need_count += (3 - index_count[i]);
						if (need_count > can_use_favus_count)
						{
							founded = false;
							break;
						}
						if (index_count[i] == 0)
						{
							way.push_back(favus);
							way.push_back(favus);
							way.push_back(favus);
						}
						else if (index_count[i] == 1)
						{
							way.push_back(i);
							way.push_back(favus);
							way.push_back(favus);
						}
						else if (index_count[i] == 2)
						{
							way.push_back(i);
							way.push_back(i);
							way.push_back(favus);
						}
					}
					else
					{
						way.push_back(i);
						way.push_back(i);
						way.push_back(i);
					}
				}
				if (founded)
				{
					vector<int> temp_index_count(index_count);
					for (int i = pv; i < pv + reallen; ++i)
					{
						if (temp_index_count[i] < 3)
							temp_index_count[i] = 0;
						else
							temp_index_count[i] -= 3;
					}
					for (int count = 1; count < 4; ++count)
					{
						for (int k = 1; k < 16; k++)
						{
							if (temp_index_count[k] == count)
							{
								way.push_back(k);
								if (way.size() == len)
									break;
							}
						}
						if (way.size() == len)
						{
							ways.push_back(std::move(way));
							break;
						}
					}

					// 如果前面无法组成翅膀但还有癞子，则考虑翅膀为带癞子
					int waylen = way.size();
					if (waylen != len && can_use_favus_count - need_count > len - waylen)
					{
						way.insert(way.end(), (len - waylen), favus);
						ways.push_back(std::move(way));
						break;
					}
				}
			}
			can_use_favus_count++;
			if (can_use_favus_count > favus_count)
				break;
		}
	}
}

void FavusAI::get_tip_aeroplane_l_cards(vector<vector<int>>& ways, const vector<int>& index_count, int pressval, int len, int favus, int favus_count)
{
	if (len > 16)
		return;
	if (pressval + len / 5 >= 13)
		return;
	NormalAI::get_tip_aeroplane_l_cards(ways, index_count, pressval, len);
	if (ways.empty())
	{
		int can_use_favus_count = 1;
		int reallen = len / 3;
		while (ways.empty())
		{
			for (int pv = pressval + 1; pv <= 13 - reallen; pv++)
			{
				bool founded = true;
				int need_count = 0;
				vector<int> way;
				for (int i = pv; i < pv + reallen; ++i)
				{
					if (index_count[i] < 3)
					{
						need_count += (3 - index_count[i]);
						if (need_count > can_use_favus_count)
						{
							founded = false;
							break;
						}
						if (index_count[i] == 0)
						{
							way.push_back(favus);
							way.push_back(favus);
							way.push_back(favus);
						}
						else if (index_count[i] == 1)
						{
							way.push_back(i);
							way.push_back(favus);
							way.push_back(favus);
						}
						else if (index_count[i] == 2)
						{
							way.push_back(i);
							way.push_back(i);
							way.push_back(favus);
						}
					}
					else
					{
						way.push_back(i);
						way.push_back(i);
						way.push_back(i);
					}
				}
				if (founded)
				{
					vector<int> temp_index_count(index_count);
					for (int i = pv; i < pv + reallen; ++i)
					{
						if (temp_index_count[i] < 3)
							temp_index_count[i] = 0;
						else
							temp_index_count[i] -= 3;
					}
					for (int count = 2; count < 4; ++count)
					{
						for (int k = 1; k < 14; k++)
						{
							if (temp_index_count[k] == count)
							{
								way.push_back(k);
								way.push_back(k);
								if (way.size() == len)
									break;
							}
						}
						if (way.size() == len)
						{
							ways.push_back(std::move(way));
							break;
						}
					}
					// 如果前面无法组成翅膀但还有癞子，则考虑翅膀为带癞子
					if (way.size() != len && can_use_favus_count > need_count)
					{
						int cur_need_count = need_count;
						for (int k = 1; k < 14; k++)
						{
							if (temp_index_count[k] % 2 == 1)
							{
								way.push_back(k);
								way.push_back(favus);
								cur_need_count++;
								if (cur_need_count>can_use_favus_count)
									break;
								if (way.size() == len)
									break;
							}
						}
						if (cur_need_count > can_use_favus_count)
							break;
						if (way.size() == len)
						{
							ways.push_back(std::move(way));
							break;
						}

						// 用一对癞子作为翅膀,属于极少情况
						if (can_use_favus_count - cur_need_count == len - way.size())
						{
							way.insert(way.end(), len - way.size(), favus);
							ways.push_back(std::move(way));
							break;
						}
					}
				}
			}
			can_use_favus_count++;
			if (can_use_favus_count > favus_count)
				break;
		}
	}
}

void FavusAI::get_tip_four_1_cards(vector<vector<int>>& ways, const vector<int>& index_count, int pressval, int favus, int favus_count)
{
	NormalAI::get_tip_four_1_cards(ways, index_count, pressval);
}

void FavusAI::get_tip_four_2_cards(vector<vector<int>>& ways, const vector<int>& index_count, int pressval, int favus, int favus_count)
{
	NormalAI::get_tip_four_2_cards(ways, index_count, pressval);
}

void FavusAI::get_tip_favus_bomb_cards(vector<vector<int>>& ways, const vector<int>& index_count, int pressval, int favus, int favus_count)
{
	//找软炸弹
	for (int use_favus_count = 1; use_favus_count <= favus_count; ++use_favus_count)
	{
		for (int i = pressval + 1; i < 14; ++i)
		{
			if (index_count[i]>0 && index_count[i] < 4 && (index_count[i] + use_favus_count) >= 4)
			{
				vector<int> way(index_count[i], i);
				way.insert(way.end(), (4 - index_count[i]), favus);
				ways.push_back(std::move(way));
			}
		}
	}
}

void FavusAI::get_tip_all_favus_bomb_cards(vector<vector<int>>& ways, int favus, int favus_count)
{
	//找纯癞子炸弹
	if (favus_count==4)
	{
		vector<int> way(4, favus);
		ways.push_back(std::move(way));
	}
}

//////////////////////////////////////////////////////////////////////////
void FavusAI::get_single_ways(vector<pair<vector<int>, int>>& ways, const vector<int>& index_count, int pressval, int favus, int favus_count)
{
	for (int i = pressval + 1; i < 16; ++i)
	{
		if (index_count[i] >= 1)
		{
			vector<int> way(1, i);
			ways.push_back(std::move(make_pair(way, SINGLE_TYPE)));
		}
	}
	if (favus > pressval && favus_count >= 1)
	{
		vector<int> way(1, favus);
		ways.push_back(std::move(make_pair(way, SINGLE_TYPE)));
	}
}

void FavusAI::get_pair_ways(vector<pair<vector<int>, int>>& ways, const vector<int>& index_count, int pressval, int favus, int favus_count)
{
	for (int i = pressval + 1; i < 14; ++i)
	{
		if (index_count[i] != 0 && index_count[i] + favus_count >= 2)
		{
			vector<int> way(2, i);
			ways.push_back(std::move(make_pair(way, PAIR_TYPE)));
		}
	}
	if (favus > pressval && favus_count >= 2)
	{
		vector<int> way(2, favus);
		ways.push_back(std::move(make_pair(way, PAIR_TYPE)));
	}
}

void FavusAI::get_trio_ways(vector<pair<vector<int>, int>>& ways, const vector<int>& index_count, int pressval, int favus, int favus_count)
{
	for (int i = pressval + 1; i < 14; ++i)
	{
		if (index_count[i] != 0 && index_count[i] + favus_count >= 3)
		{
			vector<int> way(3, i);
			ways.push_back(std::move(make_pair(way, TRIO_TYPE)));
		}
	}
	if (favus > pressval && favus_count >= 3)
	{
		vector<int> way(3, favus);
		ways.push_back(std::move(make_pair(way, TRIO_TYPE)));
	}
}

void FavusAI::get_favus_bomb_ways(vector<pair<vector<int>, int>>& ways, const vector<int>& index_count, int pressval, int favus, int favus_count)
{
	for (int i = pressval + 1; i < 14; ++i)
	{
		if (index_count[i] > 0 && index_count[i] < 4 && index_count[i] + favus_count >= 4)
		{
			vector<int> way(4, i);
			ways.push_back(std::move(make_pair(way, FAVUS_BOMB_TYPE)));
		}
	}
}

void FavusAI::get_bomb_ways(vector<pair<vector<int>, int>>& ways, const vector<int>& index_count, int pressval)
{
	for (int i = pressval + 1; i < 14; ++i)
	{
		if (index_count[i] == 4)
		{
			vector<int> way(4, i);
			ways.push_back(std::move(make_pair(way, BOMB_TYPE)));
		}
	}
}

void FavusAI::get_all_favus_bomb_ways(vector<pair<vector<int>, int>>& ways, int favus, int favus_count)
{
	if (favus_count == 4)
	{
		vector<int> way(4, favus);
		ways.push_back(std::move(make_pair(way, ALLFAVUS_BOMB_TYPE)));
	}
}

void FavusAI::get_nuke_ways(vector<pair<vector<int>, int>>& ways, const vector<int>& index_count)
{
	if (index_count[14] == 1 && index_count[15] == 1)
	{
		vector<int> way = { 14, 15 };
		ways.push_back(std::move(make_pair(way, NUKE_TYPE)));
	}
}

void FavusAI::get_trio_1_ways(vector<pair<vector<int>, int>>& ways, const vector<int>& index_count, int pressval, int favus, int favus_count)
{
	for (int i = pressval + 1; i < 14; ++i)
	{
		if (index_count[i] != 0 && index_count[i] + favus_count >= 3)
		{
			for (int k = 1; k < 16; k++)
			{
				if (index_count[k] >= 1 && k != i)
				{
					vector<int> way = { i, i, i, k };
					ways.push_back(std::move(make_pair(way, TRIOSINGLE_TYPE)));
				}
			}
		}
	}
}

void FavusAI::get_trio_2_ways(vector<pair<vector<int>, int>>& ways, const vector<int>& index_count, int pressval, int favus, int favus_count)
{
	for (int i = pressval + 1; i < 14; ++i)
	{
		if (index_count[i] != 0 && index_count[i] + favus_count >= 3)
		{
			for (int k = 1; k < 14; k++)
			{
				if (index_count[k] >= 2 && k != i)
				{
					vector<int> way = { i, i, i, k, k };
					ways.push_back(std::move(make_pair(way, TRIODOUBLE_TYPE)));
				}
			}
		}
	}
	if (favus > pressval && favus_count >= 3)
	{
		for (int k = 1; k < favus; k++)
		{
			if (index_count[k] >= 2)
			{
				vector<int> way = { favus, favus, favus, k, k };
				ways.push_back(std::move(make_pair(way, TRIODOUBLE_TYPE)));
			}
		}
	}
}

void FavusAI::get_straight_ways(vector<pair<vector<int>, int>>& ways, const vector<int>& index_count, int pressval, int presslen, int favus, int favus_count)
{
	if (pressval + presslen >= 13)
		return;
	for (int st = pressval + 1; st <= 13 - presslen; st++)
	{
		bool founded = true;
		int need_count = favus_count;
		int ed = st + presslen;
		if (ed != 13 && index_count[st] == 0)
			continue;
		for (int i = st; i < ed; ++i)
		{
			if (index_count[i] == 0)
			{
				need_count--;
				if (need_count < 0)
				{
					founded = false;
					break;
				}
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

void FavusAI::get_consecutive_pair_ways(vector<pair<vector<int>, int>>& ways, const vector<int>& index_count, int pressval, int presslen, int favus, int favus_count)
{
	presslen /= 2;
	if (pressval + presslen >= 13)
		return;
	for (int st = pressval + 1; st <= 13 - presslen; st++)
	{
		bool founded = true;
		int need_count = favus_count;
		int ed = st + presslen;
		if (ed != 13 && index_count[st] == 0)
			continue;
		for (int i = st; i < ed; ++i)
		{
			if (index_count[i] < 2)
			{
				need_count -= (2 - index_count[i]);
				if (need_count < 0)
				{
					founded = false;
					break;
				}
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

void FavusAI::get_aeroplane_ways(vector<pair<vector<int>, int>>& ways, const vector<int>& index_count, int pressval, int presslen, int favus, int favus_count)
{
	presslen /= 3;
	if (pressval + presslen >= 13)
		return;
	for (int st = pressval + 1; st <= 13 - presslen; st++)
	{
		bool founded = true;
		int need_count = favus_count;
		int ed = st + presslen;
		if (ed != 13 && index_count[st] == 0)
			continue;
		for (int i = st; i < ed; ++i)
		{
			if (index_count[i] < 3)
			{
				need_count -= (3 - index_count[i]);
				if (need_count < 0)
				{
					founded = false;
					break;
				}
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

void FavusAI::add_aeroplanes_ways(vector<pair<vector<int>, int>>& ways, const vector<vector<int>>& combin_ways, int staval, int num, int usecount)
{
	for (const vector<int>& loop_way : combin_ways)
	{
		int wing_may_count = loop_way.size() + usecount;
		if (loop_way.back() - loop_way.front() + 1 <= num && wing_may_count >= num * 3)
			continue;
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

void FavusAI::get_aeroplane_s2_ways(vector<pair<vector<int>, int>>& ways, const vector<int>& index_count, int pressval, int favus, int favus_count)
{
	for (int i = pressval + 1; i < 12; i++)
	{
		if (index_count[i] == 0 && i + 2 <= 12)
			continue;
		int use_count = std::max(0, (3 - index_count[i]));
		use_count += std::max(0, (3 - index_count[i + 1]));
		if (use_count <= favus_count)
		{
			vector<int> vec_combins_1;
			vector<vector<int>> combin_xx_ways;
			for (int j = 1; j < 16; j++)
			{
				int remain_count = index_count[j];
				if (j == i + 2 && j <= 12 && remain_count + use_count >= 3)
					continue;
				if (j == i || j == i + 1)
				{
					if (index_count[i] >= 3)
						remain_count -= 3;
					else
						remain_count = 0;
				}
				if (remain_count >= 1)
					vec_combins_1.push_back(j);
				if (remain_count >= 2)
					combin_xx_ways.push_back(std::move(vector<int>(2, j)));
			}
			vector<vector<int>> combin_xy_ways = get_combin(vec_combins_1, 2);
			FavusAI::add_aeroplanes_ways(ways, combin_xy_ways, i, 2, use_count);
			FavusAI::add_aeroplanes_ways(ways, combin_xx_ways, i, 2, use_count);
		}
	}
}

void FavusAI::get_aeroplane_s3_ways(vector<pair<vector<int>, int>>& ways, const vector<int>& index_count, int pressval, int favus, int favus_count)
{
	for (int i = pressval + 1; i < 11; i++)
	{
		if (index_count[i] == 0 && i + 3 <= 12)
			continue;
		int use_count = std::max(0, (3 - index_count[i]));
		use_count += std::max(0, (3 - index_count[i + 1]));
		use_count += std::max(0, (3 - index_count[i + 2]));
		if (use_count <= favus_count)
		{
			vector<int> vec_combins_1;
			vector<int> vec_combins_2;
			vector<vector<int>> combin_xxx_ways;
			for (int j = 1; j < 16; j++)
			{
				int remain_count = index_count[j];
				if (j == i + 3 && j <= 12 && remain_count + use_count >= 3)
					continue;
				if (j == i || j == i + 1 || j == i + 2)
				{
					if (index_count[i] >= 3)
						remain_count -= 3;
					else
						remain_count = 0;
				}
				if (remain_count >= 1)
					vec_combins_1.push_back(j);
				if (remain_count >= 2)
					vec_combins_2.push_back(j);
				if (remain_count >= 3 && j != i + 3)
					combin_xxx_ways.push_back(std::move(vector<int>(3, j)));
			}
			vector<vector<int>> combin_xxy_ways = make_combin(vec_combins_2, 2, vec_combins_1, 1);
			vector<vector<int>> combin_xyz_ways = get_combin(vec_combins_1, 3);
			FavusAI::add_aeroplanes_ways(ways, combin_xxx_ways, i, 3, use_count);
			FavusAI::add_aeroplanes_ways(ways, combin_xxy_ways, i, 3, use_count);
			FavusAI::add_aeroplanes_ways(ways, combin_xyz_ways, i, 3, use_count);
		}
	}
}

void FavusAI::get_aeroplane_s4_ways(vector<pair<vector<int>, int>>& ways, const vector<int>& index_count, int pressval, int favus, int favus_count)
{
	for (int i = pressval + 1; i < 10; i++)
	{
		if (index_count[i] == 0 && i + 4 <= 12)
			continue;
		int use_count = std::max(0, (3 - index_count[i]));
		use_count += std::max(0, (3 - index_count[i + 1]));
		use_count += std::max(0, (3 - index_count[i + 2]));
		use_count += std::max(0, (3 - index_count[i + 3]));
		if (use_count <= favus_count)
		{
			vector<int> vec_combins_1;
			vector<int> vec_combins_2;
			vector<int> vec_combins_3;
			vector<vector<int>> combin_xxxx_ways;
			for (int j = 1; j < 16; j++)
			{
				int remain_count = index_count[j];
				if (j == i + 4 && j <= 12 && remain_count + use_count >= 3)
					continue;
				if (j == i || j == i + 1 || j == i + 2 || j == i + 3)
				{
					if (index_count[i] >= 3)
						remain_count -= 3;
					else
						remain_count = 0;
				}
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
			FavusAI::add_aeroplanes_ways(ways, combin_xxxx_ways, i, 4, use_count);
			FavusAI::add_aeroplanes_ways(ways, combin_xxxy_ways, i, 4, use_count);
			FavusAI::add_aeroplanes_ways(ways, combin_xxyy_ways, i, 4, use_count);
			FavusAI::add_aeroplanes_ways(ways, combin_xxyz_ways, i, 4, use_count);
			FavusAI::add_aeroplanes_ways(ways, combin_xyzl_ways, i, 4, use_count);
		}
	}
}

void FavusAI::add_aeroplanel_ways(vector<pair<vector<int>, int>>& ways, const vector<vector<int>>& combin_ways, int staval, int num, int usecount)
{
	for (const vector<int>& loop_way : combin_ways)
	{
		int wing_may_count = loop_way.size() * 2 + usecount;
		if (loop_way.back() - loop_way.front() + 1 <= num && wing_may_count >= num * 3)
			continue;
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

void FavusAI::get_aeroplane_l2_ways(vector<pair<vector<int>, int>>& ways, const vector<int>& index_count, int pressval, int favus, int favus_count)
{
	for (int i = pressval + 1; i < 12; i++)
	{
		if (index_count[i] == 0 && i + 2 <= 12)
			continue;
		int use_count = std::max(0, (3 - index_count[i]));
		use_count += std::max(0, (3 - index_count[i + 1]));
		if (use_count <= favus_count)
		{
			vector<int> vec_combins_1;
			vector<vector<int>> combin_xx_ways;
			for (int j = 1; j < 14; j++)
			{
				int remain_count = index_count[j];
				if (j == i + 2 && j <= 12 && remain_count + use_count >= 3)
					continue;
				if (j == i || j == i + 1)
				{
					if (index_count[i] >= 3)
						remain_count -= 3;
					else
						remain_count = 0;
				}
				if (remain_count >= 2)
					vec_combins_1.push_back(j);
				if (remain_count == 4)
					combin_xx_ways.push_back(std::move(vector<int>(2, j)));
			}
			vector<vector<int>> combin_xy_ways = get_combin(vec_combins_1, 2);
			FavusAI::add_aeroplanel_ways(ways, combin_xy_ways, i, 2, use_count);
			FavusAI::add_aeroplanel_ways(ways, combin_xx_ways, i, 2, use_count);
		}
	}
}

void FavusAI::get_aeroplane_l3_ways(vector<pair<vector<int>, int>>& ways, const vector<int>& index_count, int pressval, int favus, int favus_count)
{
	for (int i = pressval + 1; i < 11; i++)
	{
		if (index_count[i] == 0 && i + 3 <= 12)
			continue;
		int use_count = std::max(0, (3 - index_count[i]));
		use_count += std::max(0, (3 - index_count[i + 1]));
		use_count += std::max(0, (3 - index_count[i + 2]));
		if (use_count <= favus_count)
		{
			vector<int> vec_combins_1;
			vector<int> vec_combins_2;
			for (int j = 1; j < 14; j++)
			{
				int remain_count = index_count[j];
				if (j == i + 3 && j <= 12 && remain_count + use_count >= 3)
					continue;
				if (j == i || j == i + 1 || j == i + 2)
				{
					if (index_count[i] >= 3)
						remain_count -= 3;
					else
						remain_count = 0;
				}
				if (remain_count >= 2)
					vec_combins_1.push_back(j);
				if (remain_count == 4)
					vec_combins_2.push_back(j);
			}
			vector<vector<int>> combin_xxy_ways = make_combin(vec_combins_2, 2, vec_combins_1, 1);
			vector<vector<int>> combin_xyz_ways = get_combin(vec_combins_1, 3);
			FavusAI::add_aeroplanel_ways(ways, combin_xxy_ways, i, 3, use_count);
			FavusAI::add_aeroplanel_ways(ways, combin_xyz_ways, i, 3, use_count);
		}
	}
}

void FavusAI::get_four_1_ways(vector<pair<vector<int>, int>>& ways, const vector<int>& index_count, int pressval, int favus, int favus_count)
{
	for (int i = pressval + 1; i < 14; ++i)
	{
		if (index_count[i] != 0 && index_count[i] + favus_count >= 4)
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
			NormalAI::add_four1_ways(ways, combin_xy_ways, i);
			NormalAI::add_four1_ways(ways, combin_xx_ways, i);
		}
	}
	if (favus_count == 4 && favus > pressval)
	{
		vector<int> vec_combins_1;
		vector<vector<int>> combin_xx_ways;
		for (int j = 1; j < favus; j++)
		{
			if (index_count[j] >= 1)
				vec_combins_1.push_back(j);
			if (index_count[j] >= 2)
				combin_xx_ways.push_back(std::move(vector<int>(2, j)));
		}
		vector<vector<int>> combin_xy_ways = get_combin(vec_combins_1, 2);
		NormalAI::add_four1_ways(ways, combin_xy_ways, favus);
		NormalAI::add_four1_ways(ways, combin_xx_ways, favus);
	}
}

void FavusAI::get_four_2_ways(vector<pair<vector<int>, int>>& ways, const vector<int>& index_count, int pressval, int favus, int favus_count)
{
	for (int i = pressval + 1; i < 14; ++i)
	{
		if (index_count[i] != 0 && index_count[i] + favus_count >= 4)
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
			NormalAI::add_four2_ways(ways, combin_xy_ways, i);
			NormalAI::add_four2_ways(ways, combin_xx_ways, i);
		}
	}
	if (favus_count == 4 && favus > pressval)
	{
		vector<int> vec_combins_1;
		vector<vector<int>> combin_xx_ways;
		for (int j = 1; j < favus; j++)
		{
			if (index_count[j] >= 2)
				vec_combins_1.push_back(j);
			if (index_count[j] == 4)
				combin_xx_ways.push_back(std::move(vector<int>(2, j)));
		}
		vector<vector<int>> combin_xy_ways = get_combin(vec_combins_1, 2);
		NormalAI::add_four2_ways(ways, combin_xy_ways, favus);
		NormalAI::add_four2_ways(ways, combin_xx_ways, favus);
	}
}

vector<pair<vector<int>, int>> FavusAI::get_press_putways(const vector<int>& cards, int presstype, int pressval, int presslen, int favus)
{
	int cardslen = cards.size();
	pair<vector<int>, int> the_data = get_index_count_favus(cards, favus);
	vector<pair<vector<int>, int>> putways;
	vector<int> pass;
	putways.push_back(std::move(make_pair(std::move(pass), PASS_TYPE)));
	if (presstype >= FAVUS_BOMB_TYPE)
	{
		if (presstype == NUKE_TYPE)
			return putways;
		if (presstype == FAVUS_BOMB_TYPE)
		{
			get_favus_bomb_ways(putways, the_data.first, pressval, favus, the_data.second);
			get_bomb_ways(putways, the_data.first, 0);
		}
		if (presstype == BOMB_TYPE)
		{
			get_bomb_ways(putways, the_data.first, pressval);
		}
		get_all_favus_bomb_ways(putways, favus, the_data.second);
		get_nuke_ways(putways, the_data.first);
	}
	else
	{
		if (cardslen >= presslen)
		{
			switch (presstype)
			{
			case SINGLE_TYPE:
			{
				get_single_ways(putways, the_data.first, pressval, favus, the_data.second);
				break;
			}
			case PAIR_TYPE:
			{
				get_pair_ways(putways, the_data.first, pressval, favus, the_data.second);
				break;
			}
			case TRIO_TYPE:
			{
				get_trio_ways(putways, the_data.first, pressval, favus, the_data.second);
				break;
			}
			case TRIOSINGLE_TYPE:
			{
				get_trio_1_ways(putways, the_data.first, pressval, favus, the_data.second);
				break;
			}
			case TRIODOUBLE_TYPE:
			{
				get_trio_2_ways(putways, the_data.first, pressval, favus, the_data.second);
				break;
			}
			case STRAIGHT_TYPE:
			{
				get_straight_ways(putways, the_data.first, pressval, presslen, favus, the_data.second);
				break;
			}
			case CONPAIR_TYPE:
			{
				get_consecutive_pair_ways(putways, the_data.first, pressval, presslen, favus, the_data.second);
				break;
			}
			case AEROPLANE_TYPE:
			{
				get_aeroplane_ways(putways, the_data.first, pressval, presslen, favus, the_data.second);
				break;
			}
			case AEROPLANES_TYPE:
			{
				switch (presslen)
				{
				case 8:
				{
					get_aeroplane_s2_ways(putways, the_data.first, pressval, favus, the_data.second);
					break;
				}
				case 12:
				{
					get_aeroplane_s3_ways(putways, the_data.first, pressval, favus, the_data.second);
					break;
				}
				case 16:
				{
					get_aeroplane_s4_ways(putways, the_data.first, pressval, favus, the_data.second);
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
					get_aeroplane_l2_ways(putways, the_data.first, pressval, favus, the_data.second);
					break;
				}
				case 15:
				{
					get_aeroplane_l3_ways(putways, the_data.first, pressval, favus, the_data.second);
					break;
				}
				default:
					break;
				}
				break;
			}
			case FOURSINGLE_TYPE:
			{
				get_four_1_ways(putways, the_data.first, pressval, favus, the_data.second);
				break;
			}
			case FOURDOUBLE_TYPE:
			{
				get_four_2_ways(putways, the_data.first, pressval, favus, the_data.second);
				break;
			}
			default:
				break;
			}
		}
		get_favus_bomb_ways(putways, the_data.first, 0, favus, the_data.second);
		get_bomb_ways(putways, the_data.first, 0);
		get_all_favus_bomb_ways(putways, favus, the_data.second);
		get_nuke_ways(putways, the_data.first);
	}
	return putways;
}

vector<pair<vector<int>, int>> FavusAI::get_free_putways(const vector<int>& cards, int favus)
{
	int cardslen = cards.size();
	vector<pair<vector<int>, int>> putways;
	pair<vector<int>, int> the_data = get_index_count_favus(cards, favus);
	get_single_ways(putways, the_data.first, 0, favus, the_data.second);
	if (cardslen >= 2)
	{
		get_pair_ways(putways, the_data.first, 0, favus, the_data.second);
		get_nuke_ways(putways, the_data.first);
	}
	if (cardslen >= 3)
		get_trio_ways(putways, the_data.first, 0, favus, the_data.second);
	if (cardslen >= 4)
	{
		get_trio_1_ways(putways, the_data.first, 0, favus, the_data.second);
		get_favus_bomb_ways(putways, the_data.first, 0, favus, the_data.second);
		get_bomb_ways(putways, the_data.first, 0);
		get_all_favus_bomb_ways(putways, favus, the_data.second);
	}
	if (cardslen >= 5)
	{
		get_trio_2_ways(putways, the_data.first, 0, favus, the_data.second);
		get_straight_ways(putways, the_data.first, 0, 5, favus, the_data.second);
	}
	if (cardslen >= 6)
	{
		get_straight_ways(putways, the_data.first, 0, 6, favus, the_data.second);
		get_consecutive_pair_ways(putways, the_data.first, 0, 6, favus, the_data.second);
		get_aeroplane_ways(putways, the_data.first, 0, 6, favus, the_data.second);
		get_four_1_ways(putways, the_data.first, 0, favus, the_data.second);
	}
	if (cardslen >= 7)
	{
		get_straight_ways(putways, the_data.first, 0, 7, favus, the_data.second);
	}
	if (cardslen >= 8)
	{
		get_straight_ways(putways, the_data.first, 0, 8, favus, the_data.second);
		get_consecutive_pair_ways(putways, the_data.first, 0, 8, favus, the_data.second);
		get_aeroplane_s2_ways(putways, the_data.first, 0, favus, the_data.second);
		get_four_2_ways(putways, the_data.first, 0, favus, the_data.second);
	}
	if (cardslen >= 9)
	{
		get_straight_ways(putways, the_data.first, 0, 9, favus, the_data.second);
		get_aeroplane_ways(putways, the_data.first, 0, 9, favus, the_data.second);
	}
	if (cardslen >= 10)
	{
		get_straight_ways(putways, the_data.first, 0, 10, favus, the_data.second);
		get_consecutive_pair_ways(putways, the_data.first, 0, 10, favus, the_data.second);
		get_aeroplane_l2_ways(putways, the_data.first, 0, favus, the_data.second);
	}
	if (cardslen >= 11)
	{
		get_straight_ways(putways, the_data.first, 0, 11, favus, the_data.second);
	}
	if (cardslen >= 12)
	{
		get_straight_ways(putways, the_data.first, 0, 12, favus, the_data.second);
		get_consecutive_pair_ways(putways, the_data.first, 0, 12, favus, the_data.second);
		get_aeroplane_ways(putways, the_data.first, 0, 12, favus, the_data.second);
		get_aeroplane_s3_ways(putways, the_data.first, 0, favus, the_data.second);
	}
	if (cardslen >= 14)
	{
		get_consecutive_pair_ways(putways, the_data.first, 0, 14, favus, the_data.second);
	}
	if (cardslen >= 15)
	{
		get_aeroplane_ways(putways, the_data.first, 0, 15, favus, the_data.second);
		get_aeroplane_l3_ways(putways, the_data.first, 0, favus, the_data.second);
	}
	if (cardslen >= 16)
	{
		get_consecutive_pair_ways(putways, the_data.first, 0, 16, favus, the_data.second);
		get_aeroplane_s4_ways(putways, the_data.first, 0, favus, the_data.second);
	}
	if (cardslen >= 18)
	{
		get_consecutive_pair_ways(putways, the_data.first, 0, 18, favus, the_data.second);
		get_aeroplane_ways(putways, the_data.first, 0, 18, favus, the_data.second);
	}
	if (cardslen == 20)
	{
		vector<FavusCardData> allcardtype = get_cards_type(cards, favus);
		if (allcardtype.front().cardtype > ERROR_TYPE)
		{
			//如果能一开局一手出完就把牌值放在牌头，前面没有考虑这种情况 
			vector<int> put_cards(cards);
			for (int i = 0; i < cardslen; ++i)
			{
				if (put_cards[i] == allcardtype.front().cardval)
				{
					int temp = put_cards[0];
					put_cards[0] = put_cards[i];
					put_cards[i] = temp;
					break;
				}
			}
			putways.push_back(std::move(make_pair(std::move(put_cards), allcardtype.front().cardtype)));
		}
	}
	return putways;
}

////////////////////////////待codereview//////////////////////////////////
vector<int> FavusAI::get_a_good_way(const vector<int>& index_count, int favus, int favus_count, int cardlen)
{
	int sta_val;
	int end_val;
	for (int i = 1; i < 16; ++i)
	{
		if (index_count[i] != 0)
		{
			sta_val = i;
			break;
		}
	}
	for (int i = 15; i > 0; --i)
	{
		if (index_count[i] != 0)
		{
			end_val = i;
			break;
		}
	}
	vector<pair<vector<int>, int>> max_straight_ways;
	vector<pair<vector<int>, int>> max_consecutive_pair_ways;
	vector<pair<vector<int>, int>> max_aeroplane_ways;
	cardlen += favus_count;
	for (int i = cardlen; i >= 5; --i)
	{
		get_straight_ways(max_straight_ways, index_count, 0, i, favus, favus_count);
		if (!max_straight_ways.empty())
			break;
	}
	for (int i = cardlen; i >= 6; --i)
	{
		if (i % 2 == 0)
			get_consecutive_pair_ways(max_consecutive_pair_ways, index_count, 0, i, favus, favus_count);
		if (!max_consecutive_pair_ways.empty())
			break;
	}
	for (int i = cardlen; i >= 6; --i)
	{
		if (i % 3 == 0)
			get_aeroplane_ways(max_aeroplane_ways, index_count, 0, i, favus, favus_count);
		if (!max_aeroplane_ways.empty())
			break;
	}
	if (max_straight_ways.size() > 0 && max_aeroplane_ways.size() > 0 && max_aeroplane_ways[0].first.size() >= max_straight_ways[0].first.size() * 3)
	{
		return max_aeroplane_ways[0].first;
	}
	if (max_consecutive_pair_ways.size() > 0 && max_consecutive_pair_ways[0].first.front() == sta_val && max_consecutive_pair_ways[0].first.back() == end_val)
	{
		return max_consecutive_pair_ways[0].first;
	}
	if (max_straight_ways.size() > 0)
	{
		return max_straight_ways[0].first;
	}
	vector<int> empty;
	return empty;
}

vector<int> FavusAI::get_good_putways(const vector<int>& cards, int favus, int favus_count)
{
	vector<FavusCardData> allcardtype = get_cards_type(cards, favus);
	if (allcardtype[0].cardtype > ERROR_TYPE)
		return cards;
	if (favus_count>1)
		favus_count = 1;
	int cardslen = cards.size();
	pair<vector<int>, int> the_data = get_index_count_favus(cards, favus);
	for (int addcount = 0; addcount <= favus_count; ++addcount)
	{
		vector<int> good_way = get_a_good_way(the_data.first, favus, (the_data.second + addcount), cardslen);
		if (!good_way.empty())
		{
			return good_way;
		}
	}
	return cards;
}

//////////////////////////////////////////////////////////////////////////
vector<pair<vector<int>, int>> FavusAI::limit_ways(int favus, const vector<int>& cards, const vector<pair<vector<int>, int>>& ways, int limit_count)
{
	int wayslen = ways.size();
	vector<pair<vector<int>, int>> newways;
	vector<int> scores;
	vector<int> best_index;
	for (int i = 0; i < wayslen; ++i)
		scores.push_back(evaluate(favus, subcards(favus, cards, ways[i].first)));
	for (int count = 0; count < limit_count; ++count)
	{
		int temp_best_score = MINVAL;
		int temp_best_score_index = 0;
		for (int i = 0; i < wayslen; ++i)
		{
			if (scores[i]>temp_best_score)
			{
				temp_best_score = scores[i];
				temp_best_score_index = i;
			}
		}
		best_index.push_back(temp_best_score_index);
		scores[temp_best_score_index] = MINVAL;
	}
	for (int i = 0; i < limit_count; ++i)
		newways.push_back(ways[best_index[i]]);
	return newways;
}

FavusAICardData FavusAI::make_best_way(const pair<vector<int>, int>& way, int val)
{
	FavusAICardData the_data;
	the_data.cards.assign(way.first.begin(), way.first.end());
	the_data.cardtype = way.second;
	the_data.cardval = val;
	return the_data;
}

bool FavusAI::is_bomb_or_nuke(int favus, const vector<int>& cards)
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
		int notfavus_val = 0;
		for (int i = 0; i < 4; ++i)
		{
			if (cards[i] != favus)
			{
				notfavus_val = cards[i];
				break;
			}
		}
		if (notfavus_val != 0)
		{
			for (int i = 0; i < 4; ++i)
			{
				if (cards[i] != favus && cards[i] != notfavus_val)
					return false;
			}
		}
		return true;
	}
	return false;
}

FavusAICardData FavusAI::get_put_way(int favus, const vector<int>& up_cards, const vector<int>& my_cards, const vector<int>& down_cards, int landlord_index, int presstype, int pressval, int presslen, int press_index, int think_time)
{
	vector<pair<vector<int>, int>> putways;
	if (press_index == 1) // 先手出法 
		putways = get_free_putways(my_cards, favus);
	else // 压牌出法
		putways = get_press_putways(my_cards, presstype, pressval, presslen, favus);

	int putlen = putways.size();
	// 只有一种出法就直接出
	if (putlen == 1)
	{
		FavusAICardData the_data;
		the_data.cards.assign(putways[0].first.begin(), putways[0].first.end());
		the_data.cardtype = putways[0].second;
		if (putways[0].first.empty())// 只能pass
			the_data.cardval = 0;
		else
			the_data.cardval = (putways[0].first).front();
		return the_data;
	}

	int isfriend = landlord_index == 0 ? 1 : -1;
	(landlord_index += 2) %= 3;

	//期望剪枝
	if (press_index == 1)
	{
		if (putlen > FREEWAYSLIMIT)
		{
			putways = limit_ways(favus, my_cards, putways, FREEWAYSLIMIT);
			putlen = putways.size();
		}
	}
	else
	{
		if (putlen > PRESSWAYSLIMIT)
		{
			putways = limit_ways(favus, my_cards, putways, PRESSWAYSLIMIT);
			putlen = putways.size();
		}
	}

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
			remain_cards.push_back(subcards(favus, my_cards, putways[i].first));
	}

	// 计算每种走法是否是炸弹 
	vector<bool> is_put_bomb_or_nuke;
	for (int i = 0; i < putlen; ++i)
	{
		if (putways[i].first.empty())
			is_put_bomb_or_nuke.push_back(false);
		else
			is_put_bomb_or_nuke.push_back(is_bomb_or_nuke(favus,putways[i].first));
	}

	// 搜索方式 : 迭代深化--负极大值 
	int best_index = 0;
	NormalAI::m_nStartTime = NormalAI::get_time();
	NormalAI::m_nThinkTime = think_time;
	for (int depth = 2; depth <= 32; depth += 3)
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
				way_value = isfriend*search_val(favus, my_cards, down_cards, up_cards, landlord_index, presstype, pressval, presslen, temp_press_index, depth, base_score, (landlord_index == 0 ? beta_val : -alpha_val));
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
					way_value = isfriend*search_val(favus, remain_cards[i], down_cards, up_cards, landlord_index, putways[i].second, put_way_val[i], putways[i].first.size(), temp_press_index, depth, base_score, (landlord_index == 0 ? beta_val : -alpha_val));
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

int FavusAI::search_val(int favus, const vector<int>& up_cards, const vector<int>& my_cards, const vector<int>& down_cards, int landlord_index, int presstype, int pressval, int presslen, int press_index, int thinkdepth, int base_score, int beta)
{
	if (thinkdepth == 0)
	{
		if (NormalAI::get_time() - NormalAI::m_nStartTime >= NormalAI::m_nThinkTime)
			return TIMEOUTVAL;
		if (landlord_index == 1)
		{
			return (evaluate(favus, my_cards) - (evaluate(favus, up_cards) + evaluate(favus, down_cards)) / 2);
		}
		else if (landlord_index == 0)
		{
			return ((evaluate(favus, my_cards) + evaluate(favus, down_cards)) / 2 - evaluate(favus, up_cards));
		}
		else
		{
			return ((evaluate(favus, my_cards) + evaluate(favus, up_cards)) / 2 - evaluate(favus, down_cards));
		}
	}
	thinkdepth--;

	vector<pair<vector<int>, int>> putways;
	if (press_index == 1) // 先手出法 
		putways = get_free_putways(my_cards, favus);
	else // 压牌出法
		putways = get_press_putways(my_cards, presstype, pressval, presslen, favus);

	int isfriend = (landlord_index == 0 ? 1 : -1);
	int alpha_val = MINVAL;
	(landlord_index += 2) %= 3;

	//期望剪枝
	int putlen = putways.size();
	if (press_index == 1)
	{
		if (putlen > FREEWAYSLIMIT)
		{
			putways = limit_ways(favus, my_cards, putways, FREEWAYSLIMIT);
			putlen = putways.size();
		}
	}
	else
	{
		if (putlen > PRESSWAYSLIMIT)
		{
			putways = limit_ways(favus, my_cards, putways, PRESSWAYSLIMIT);
			putlen = putways.size();
		}
	}

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
			way_value = isfriend*search_val(favus, my_cards, down_cards, up_cards, landlord_index, presstype, pressval, presslen, temp_press_index, thinkdepth, base_score, (landlord_index == 0 ? beta : -alpha_val));
		}
		else
		{
			vector<int> remain_cards = subcards(favus, my_cards, putways[i].first);
			if (is_bomb_or_nuke(favus, putways[i].first))
				base_score *= 2;
			if (remain_cards.empty())
			{
				way_value = JUDGEVAL*base_score;
			}
			else
			{
				temp_press_index = 0;
				way_value = isfriend*search_val(favus, remain_cards, down_cards, up_cards, landlord_index, putways[i].second, put_way_val[i], putways[i].first.size(), temp_press_index, thinkdepth, base_score, (landlord_index == 0 ? beta : -alpha_val));
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

int FavusAI::evaluate(int favus, const vector<int>& cards)
{
	if (cards.empty())
		return JUDGEVAL;
	int cardlen = cards.size();
	int favus_count = 0;
	vector<int> nofavus_cards;
	for (int i = 0; i < cardlen; ++i)
	{
		if (cards[i] == favus)
		{
			favus_count++;
		}
		else
		{
			nofavus_cards.push_back(cards[i]);
		}
	}
	if (favus_count == 0)
		return NormalAI::evaluate(cards);
	if (nofavus_cards.empty())
		return CARD_VAL[favus][favus_count];
	int best_scores = 0;
	for (int i = 0; i < favus_count; ++i)
	{
		nofavus_cards.push_back(favus);
		int cur_best_scores = NormalAI::evaluate(nofavus_cards);
		int cur_best_index = favus;
		nofavus_cards.pop_back();
		for (int k = 1; k < 13; ++k)
		{
			if (k!=favus)
			{
				nofavus_cards.push_back(k);
				int temp_scores = NormalAI::evaluate(nofavus_cards);
				int temp_index = k;
				nofavus_cards.pop_back();
				if (temp_scores > cur_best_scores)
				{
					cur_best_scores = temp_scores;
					cur_best_index = k;
				}
			}
		}
		nofavus_cards.push_back(cur_best_index);
		best_scores = cur_best_scores;
	}
	return best_scores;
}

//////////////////////////////////////////////////////////////////////////
bool FavusAI::Lua_CanPress(const vector<int>& cards, int presstype, int pressval, int presslen, int favus)
{
	vector<int> nm_cards = normalizedcards(cards);
	sort(nm_cards.begin(), nm_cards.end());
	return can_press(nm_cards, presstype, pressval, presslen, favus);
}

int FavusAI::Lua_GetTypeNum(int favus, const vector<int>& cards, int cardtype)
{
	int cardslen = cards.size();
	vector<int> nm_cards = normalizedcards(cards);
	sort(nm_cards.begin(), nm_cards.end());
	vector<pair<vector<int>, int>> typeways;
	pair<vector<int>, int> the_data = get_index_count_favus(nm_cards, favus);
	vector<FavusCardData> card_data = get_cards_type(nm_cards, favus);
	for (size_t i = 0; i < card_data.size(); ++i)
	{
		if (card_data[i].cardtype == cardtype)
			return 1;
	}
	int num = 0;
	switch (cardtype)
	{
	case SINGLE_TYPE:
	{
		get_single_ways(typeways, the_data.first, 0, favus, the_data.second);
		num = typeways.size();
		break;
	}
	case PAIR_TYPE:
	{
		get_pair_ways(typeways, the_data.first, 0, favus, the_data.second);
		num = typeways.size();
		break;
	}
	case TRIO_TYPE:
	{
		get_trio_ways(typeways, the_data.first, 0, favus, the_data.second);
		num = typeways.size();
		break;
	}
	case BOMB_TYPE:
	{
		get_bomb_ways(typeways, the_data.first, 0);
		num = typeways.size();
		break;
	}
	case FAVUS_BOMB_TYPE:
	{
		get_favus_bomb_ways(typeways, the_data.first, 0, favus, the_data.second);
		num = typeways.size();
		break;
	}
	case ALLFAVUS_BOMB_TYPE:
	{
		get_all_favus_bomb_ways(typeways, favus, the_data.second);
		num = typeways.size();
		break;
	}
	case TRIOSINGLE_TYPE:
	{
		get_trio_1_ways(typeways, the_data.first, 0, favus, the_data.second);
		if (typeways.size() > 0)
			num = 1;
		break;
	}
	case TRIODOUBLE_TYPE:
	{
		get_trio_2_ways(typeways, the_data.first, 0, favus, the_data.second);
		if (typeways.size() > 0)
			num = 1;
		break;
	}
	case STRAIGHT_TYPE:
	{
		for (int len = 5; len < cardslen; ++len)
		{
			get_straight_ways(typeways, the_data.first, 0, len, favus, the_data.second);
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
			{
				get_consecutive_pair_ways(typeways, the_data.first, 0, len, favus, the_data.second);
				if (typeways.size() > 0)
				{
					num = 1;
					break;
				}
			}
		}
		break;
	}
	case AEROPLANE_TYPE:
	{
		if (cardslen % 3 == 0)
		{
			for (int len = 6; len < cardslen; ++len)
			{
				get_aeroplane_ways(typeways, the_data.first, 0, len, favus, the_data.second);
				if (typeways.size() > 0)
				{
					num = 1;
					break;
				}
			}
		}
		break;
	}
	case AEROPLANES_TYPE:
	{
		if (cardslen % 4 == 0 && cardslen >= 8)
		{
			get_aeroplane_s2_ways(typeways, the_data.first, 0, favus, the_data.second);
			get_aeroplane_s3_ways(typeways, the_data.first, 0, favus, the_data.second);
			get_aeroplane_s4_ways(typeways, the_data.first, 0, favus, the_data.second);
		}
		if (typeways.size() > 0)
			num = 1;
		break;
	}
	case AEROPLANEL_TYPE:
	{
		if (cardslen % 5 == 0 && cardslen >= 10)
		{
			get_aeroplane_l2_ways(typeways, the_data.first, 0, favus, the_data.second);
			get_aeroplane_l3_ways(typeways, the_data.first, 0, favus, the_data.second);
		}
		if (typeways.size() > 0)
			num = 1;
		break;
	}
	case FOURSINGLE_TYPE:
	{
		get_four_1_ways(typeways, the_data.first, 0, favus, the_data.second);
		if (typeways.size() > 0)
			num = 1;
		break;
	}
	case FOURDOUBLE_TYPE:
	{
		get_four_2_ways(typeways, the_data.first, 0, favus, the_data.second);
		if (typeways.size() > 0)
			num = 1;
		break;
	}
	case NUKE_TYPE:
	{
		get_nuke_ways(typeways, the_data.first);
		num = typeways.size();
		break;
	}
	default:
		break;
	}
	return num;
}

vector<int> FavusAI::Lua_GetMaxWays(const vector<int>& cards, int favus, const vector<int> favus_cards)
{
	if (cards.empty())
	{
		vector<int> empty;
		return empty;
	}
	vector<int> nm_cards = normalizedcards(cards);
	vector<int> compare_cards(nm_cards);
	sort(nm_cards.begin(), nm_cards.end());
	int favus_count = favus_cards.size();
	vector<int> good_way = get_good_putways(nm_cards, favus, favus_count);
	int getwayslen = good_way.size();
	int mycardslen = cards.size();
	vector<int> all_favus_cards;
	for (int i = 0; i < mycardslen; ++i)
	{
		if (compare_cards[i] == favus)
		{
			all_favus_cards.push_back(cards[i]);
		}
	}
	for (int i = 0; i < favus_count; ++i)
	{
		all_favus_cards.push_back(favus_cards[i]);
	}
	int ex_favus_index = 0;
	for (int i = 0; i < getwayslen; ++i)
	{
		bool foundex = false;
		for (int k = 0; k < mycardslen; ++k)
		{
			if (good_way[i] == compare_cards[k])
			{
				good_way[i] = cards[k];
				compare_cards[k] = 0;
				foundex = true;
				break;
			}
		}
		if (!foundex)
		{
			good_way[i] = all_favus_cards[ex_favus_index++];
		}
	}
	return good_way;
}

vector<FavusCardData> FavusAI::Lua_GetCardType(const vector<int>& cards, int favus)
{
	vector<int> nm_cards = normalizedcards(cards);
	sort(nm_cards.begin(), nm_cards.end());
	vector<FavusCardData> alltype = get_cards_type(nm_cards, favus);
	return alltype;
}

vector<vector<int>> FavusAI::Lua_GetTips(const vector<int>& cards, int presstype, int pressval, int presslen, int favus)
{
	vector<int> nm_cards = normalizedcards(cards);
	vector<int> deal_cards(nm_cards);
	sort(deal_cards.begin(), deal_cards.end());
	vector<vector<int>> temp_ways = get_press_tip_ways(deal_cards, presstype, pressval, presslen, favus);
	//删除相同的提示
	int wayslen = temp_ways.size();
	for (int i = 0; i < wayslen - 1; ++i)
	{
		for (int j = i + 1; j < wayslen; ++j)
		{
			if (!temp_ways[i].empty() && is_same_cards(temp_ways[i], temp_ways[j]))
			{
				temp_ways[j].clear();
			}
		}
	}
	vector<vector<int>> ways;
	for (int i = 0; i < wayslen; ++i)
	{
		if (!temp_ways[i].empty())
		{
			ways.push_back(temp_ways[i]);
		}
	}
	wayslen = ways.size();
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

FavusAICardData FavusAI::Lua_GetPutWays(int favus, const vector<int>& up_cards, const vector<int>& my_cards, const vector<int>& down_cards, int landlord_index, int presstype, int pressval, int presslen, int press_index, int think_time)
{
	vector<int> nm_up_cards = normalizedcards(up_cards);
	sort(nm_up_cards.begin(), nm_up_cards.end());

	vector<int> nm_mycards = normalizedcards(my_cards);
	vector<int> compare_cards(nm_mycards);
	sort(nm_mycards.begin(), nm_mycards.end());

	vector<int> nm_down_cards = normalizedcards(down_cards);
	sort(nm_down_cards.begin(), nm_down_cards.end());

	FavusAICardData putway_data = get_put_way(favus, nm_up_cards, nm_mycards, nm_down_cards, landlord_index, presstype, pressval, presslen, press_index, think_time);
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

	//癞子替换牌处理
	vector<int> temp_my_cards(my_cards);
	for (int i = 0; i < putwaylen; ++i)
	{
		bool found = false;
		for (int k = 0; k < mycardslen; ++k)
		{
			if (temp_my_cards[k] == putway_data.cards[i])
			{
				temp_my_cards[k] = 0;
				found = true;
				break;
			}
		}
		if (!found)//是癞子替换的牌
		{
			putway_data.favuscards.push_back(putway_data.cards[i]);
			putway_data.cards[i] = favus;
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
	}

	//类型统一处理
	vector<FavusCardData> cardtype_data = Lua_GetCardType(putway_data.cards, favus);
	int typelen = cardtype_data.size();
	for (int i = 0; i < typelen; ++i)
	{
		if (cardtype_data[i].cardtype == putway_data.cardtype)
		{
			putway_data.cardval = cardtype_data[i].cardval;
			putway_data.favuscards = cardtype_data[i].favuscards;
			break;
		}
	}
	return putway_data;
}