#include "AI_Library.h"

vector<int> normalizedcards(const vector<int>& cards)
{
	vector<int> normalized_cards(cards);
	int cardlen = normalized_cards.size();
	for (int i = 0; i < cardlen; ++i)
	{
		if (normalized_cards[i] < 53)
			normalized_cards[i] = (normalized_cards[i] - 1) % 13 + 1;
		else if (normalized_cards[i] == 53)
			normalized_cards[i] = 14;
		else if (normalized_cards[i] == 54)
			normalized_cards[i] = 15;
	}
	return normalized_cards;
}

vector<int> get_index_count(const vector<int>& cards)
{
	vector<int> index_count(16, 0);
	for (int var : cards)
		index_count[var]++;
	return index_count;
}

pair<vector<int>, int> get_index_count_favus(const vector<int>& cards, int favus)
{
	vector<int> index_count(16, 0);
	int favus_count = 0;
	for (int var : cards)
	{
		if (var == favus)
			favus_count++;
		else
			index_count[var]++;
	}
	return make_pair(std::move(index_count), favus_count);
}

vector<vector<int>> get_combin(vector<int>& vec, int num)
{
	int len = vec.size();
	vector<vector<int>> result;
	if (len < num)
	{
		return result;
	}
	if (len == num)
	{
		result.push_back(std::move(vec));
		return result;
	}
	if (num == 1)
	{
		for (int i = 0; i < len; ++i)
		{
			vector<int> tempv = { vec[i] };
			result.push_back(std::move(tempv));
		}
		return result;
	}
	int backval = vec.back();
	vec.pop_back();
	vector<int> tempvec(vec);
	vector<vector<int>> next_cbs = get_combin(tempvec, (num - 1));
	int ncbslen = next_cbs.size();
	for (int i = 0; i < ncbslen; ++i)
	{
		next_cbs[i].push_back(backval);
		result.push_back(next_cbs[i]);
	}
	vector<vector<int>> other_cbs = get_combin(vec, num);
	int ocbslen = other_cbs.size();
	for (int i = 0; i < ocbslen; ++i)
		result.push_back(other_cbs[i]);
	return result;
}

vector<vector<int>> make_combin(const vector<int>& vec1, int num1, const vector<int>& vec2, int num2)
{
	int len1 = vec1.size();
	int len2 = vec2.size();
	vector<vector<int>> result;
	if (vec1.empty() || vec2.empty())
		return result;
	for (int i = 0; i < len1; ++i)
	{
		int sta2 = 0;
		if (num2 == num1)//相同个数情况，需遍历前置删除重复情况
			sta2 = i + 1;
		for (int j = sta2; j < len2; ++j)
		{
			if (vec1[i] != vec2[j])
			{
				vector<int> acombin;
				for (int k = 0; k < num1; ++k)
					acombin.push_back(vec1[i]);
				for (int k = 0; k < num2; ++k)
					acombin.push_back(vec2[j]);
				result.push_back(std::move(acombin));
			}
		}
	}
	return result;
}

vector<vector<int>> make_combin(const vector<int>& vec1, int num1, const vector<int>& vec2, int num2, const vector<int>& vec3, int num3)
{
	int len1 = vec1.size();
	int len2 = vec2.size();
	int len3 = vec3.size();
	vector<vector<int>> result;
	if (vec1.empty() || vec2.empty() || vec3.empty())
		return result;
	for (int i = 0; i < len1; ++i)
	{
		int sta2 = 0;
		if (num2 == num1)
			sta2 = i + 1;
		for (int j = sta2; j < len2; ++j)
		{
			int sta3 = 0;
			if (num3 == num2)
				sta3 = j + 1;
			for (int m = sta3; m < len3; ++m)
			{
				if (vec1[i] != vec2[j] && vec2[j] != vec3[m] && vec1[i] != vec3[m])
				{
					vector<int> acombin;
					for (int k = 0; k < num1; ++k)
						acombin.push_back(vec1[i]);
					for (int k = 0; k < num2; ++k)
						acombin.push_back(vec2[j]);
					for (int k = 0; k < num3; ++k)
						acombin.push_back(vec3[m]);
					result.push_back(std::move(acombin));
				}
			}
		}
	}
	return result;
}

vector<int> subcards(const vector<int>& cards1, const vector<int>& cards2)
{
	if (cards2.empty())
		return cards1;
	int len1 = cards1.size();
	int len2 = cards2.size();
	vector<int> cards;
	if (len1 == len2)
		return cards;
	cards.reserve(len1 - len2 + 1);
	int find_index = 0;
	int judge_index = 0;
	for (; find_index < len1; ++find_index)
	{
		if (cards2[judge_index] == cards1[find_index])
		{
			judge_index++;
			if (judge_index >= len2)
				break;
		}
		else
		{
			cards.push_back(cards1[find_index]);
		}
	}
	find_index++;
	for (; find_index < len1; ++find_index)
		cards.push_back(cards1[find_index]);
	return cards;
}

vector<int> subcards(int favus, const vector<int>& cards1, const vector<int>& cards2)
{
	if (cards2.empty())
		return cards1;
	int len1 = cards1.size();
	int len2 = cards2.size();
	vector<int> cards;
	if (len1 == len2)
		return cards;
	cards.reserve(len1 - len2);
	vector<int> temp_cards(cards1);
	for (int i = 0; i < len2; ++i)
	{
		for (int n = 0; n < len1; ++n)
		{
			if (temp_cards[n] == cards2[i])
			{
				temp_cards[n] = -1;
				break;
			}
			if (n == len1 - 1)// cards1中没有找到这张牌,减少一个癞子
			{
				for (int k = 0; k < len1; ++k)
				{
					if (temp_cards[k] == favus)
					{
						temp_cards[k] = -1;
						break;
					}
					assert(k < len1 - 1);// 没有癞子，逻辑错误
				}
			}
		}
	}
	for (int i = 0; i < len1; ++i)
	{
		if (temp_cards[i] != -1)
			cards.push_back(temp_cards[i]);
	}
	return cards;
}

bool is_same_cards(const vector<int>& cards1, const vector<int>& cards2)
{
	int len1 = cards1.size();
	int len2 = cards2.size();
	if (len1 != len2)
		return false;
	vector<int> temp_cards1(cards1);
	vector<int> temp_cards2(cards2);
	sort(temp_cards1.begin(), temp_cards1.end());
	sort(temp_cards2.begin(), temp_cards2.end());
	for (int i = 0; i < len1; ++i)
	{
		if (temp_cards1[i] != temp_cards2[i])
			return false;
	}
	return true;
}