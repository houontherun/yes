#pragma once
#include <iostream>
#include <vector>
#include <algorithm>
#include <cassert>
using namespace std;

/*
1 - 13 : ����1��[3, 4, 5...K, A, 2]
14 - 26 : ����2��[3, 4, 5...K, A, 2]
27 - 39 : ����3��[3, 4, 5...K, A, 2]
40 - 52 : ����4��[3, 4, 5...K, A, 2]
53, 54 : С��, ����
*/

//////////////////////////////////////////////////////////////////////////
const int CARD_VAL[16][5] = {
	{ 0, 0, 0, 0, 0 },					//--0
	{ 0, -117, -63, -9, 201 },			//--3
	{ 0, -104, -56, -8, 202 }, 			//--4
	{ 0, -91, -49, -7, 203 },			//--5
	{ 0, -78, -42, -6, 204 },			//--6
	{ 0, -65, -35, -5, 205 },			//--7
	{ 0, -52, -28, -4, 206 },			//--8
	{ 0, -39, -21, -3, 207 },			//--9
	{ 0, -26, -14, -2, 208 },			//--10
	{ 0, -13, -7, -1, 209 },			//--J
	{ 0, 0, 0, 0, 210 },				//--Q
	{ 0, 5, 10, 15, 211 },				//--K
	{ 0, 16, 36, 56, 212 },				//--A
	{ 0, 60, 130, 200, 270 },			//--2
	{ 0, 80, 0, 0, 0 },					//--С��
	{ 0, 100, 0, 0, 0 },				//--����
};
const int NUKEVAL = 120;
const int JUDGEVAL = 10000;
const int MAXVAL = 10000 * 1024;
const int MINVAL = -10000 * 1021;
const int TIMEOUTVAL = 10000 * 1024+6666;
const int FREEWAYSLIMIT = 20;
const int PRESSWAYSLIMIT = 10;
//////////////////////////////////////////////////////////////////////////
const int ERROR_TYPE = 0;
const int PASS_TYPE = 0;
const int SINGLE_TYPE = 1;
const int PAIR_TYPE = 2;
const int TRIO_TYPE = 3;
const int TRIOSINGLE_TYPE = 4;
const int TRIODOUBLE_TYPE = 5;
const int STRAIGHT_TYPE = 6;
const int CONPAIR_TYPE = 7;
const int AEROPLANE_TYPE = 8;
const int AEROPLANES_TYPE = 9;
const int AEROPLANEL_TYPE = 10;
const int FOURSINGLE_TYPE = 11;
const int FOURDOUBLE_TYPE = 12;
const int FAVUS_BOMB_TYPE = 13;
const int BOMB_TYPE = 14;
const int ALLFAVUS_BOMB_TYPE = 15;
const int NUKE_TYPE = 16;

// --------------------------------
// -- �������
vector<int> normalizedcards(const vector<int>& cards);

// --------------------------------
// -- ��ȡ�Ƶ�λ�ø���ֵ����
vector<int> get_index_count(const vector<int>& cards);

// --------------------------------
// -- ��ȡ����Ƶ�λ�ø���ֵ�����Լ���Ӹ���
pair<vector<int>, int> get_index_count_favus(const vector<int>& cards, int favus);

// --------------------------------
// -- ��һ��vector���Ҹ���Ϊnum�������
// -- ע�⣺�˺���ֻ���û����ͬ�������������������ȥ�ظ����
vector<vector<int>> get_combin(vector<int>& vec, int num);

// --------------------------------
// -- vec1��vec2���ظ�������
// -- ���� vec1={1,2,3},num1=2,vec2={1,2,3,4},num2=1,�򷵻�:{{1,1,2},{1,1,3},{1,1,4},{2,2,1},{2,2,3},{2,2,4},{3,3,1},{3,3,2},{3,3,4}}
vector<vector<int>> make_combin(const vector<int>& vec1, int num1, const vector<int>& vec2, int num2);
vector<vector<int>> make_combin(const vector<int>& vec1, int num1, const vector<int>& vec2, int num2, const vector<int>& vec3, int num3);

// --------------------------------
// -- �õ�cards1-cards2
vector<int> subcards(const vector<int>& cards1, const vector<int>& cards2);

// --------------------------------
// -- �õ�cards1-cards2
vector<int> subcards(int favus, const vector<int>& cards1, const vector<int>& cards2);

bool is_same_cards(const vector<int>& cards1, const vector<int>& cards2);