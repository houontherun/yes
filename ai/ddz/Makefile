#############################################################
#                                                           #
#                Makefile for libddzai.so                     #
#                Edit by hou 2016.12.19               #
#############################################################
###################Parse Build Flag##########################
MAKECMDGOALS ?= debug

ifeq ($(MAKECMDGOALS),release)
BUILD = RELEASE
else
BUILD = DEBUG
endif
#############################################################
CXX        = g++
AR         = ar
CXX_FLAGS  = -Wall -D_GNU_SOURCE -Wno-deprecated -fPIC -g -O0 -pipe -D_DEBUG -DDEBUG  -Woverloaded-virtual  -std=c++11 -D_LINUX
TARGET=./ddzAI.so

OBJ_DIR = ./

SRCDIR=./

SOURCE=$(wildcard *.cpp)

SRC=$(notdir $(SOURCE))
SRCOBJ=$(patsubst %.c,%.o,$(patsubst %.cpp,%.o,$(SRC)))
OBJS=$(addprefix $(OBJ_DIR), $(SRCOBJ))

INC = -I/home/hou/git/skynet/3rd/lua/  -I./

debug:all
release:all
all:$(OBJS)
.PHONY:clean

$(OBJ_DIR)%.o: %.cpp
	@$(CXX) $(INC) $(C_FLAGS) -c $< -o $@
	@echo compile $(BUILD)  $@
$(TARGET): $(OBJS)
	@$(CXX) $(C_FLAGS) -shared $^ -o $@ -Bstatic $(LIB)
	@echo -e "Create $(BUILD) $@"

all:$(TARGET)

clean:
	@rm -f $(TARGET) $(OBJS)
	@echo rm *.o  $(TARGET)