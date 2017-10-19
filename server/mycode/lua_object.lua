
---------------------------------------------------
-- auth： panyinglong
-- date： 2016/8/16
-- desc： 所有lua类的基类
---------------------------------------------------

local function clone(object)
    local lookup_table = {}
    local function _copy(object)
        if type(object) ~= "table" then
            return object
        elseif lookup_table[object] then
            return lookup_table[object]
        end
        local new_table = {}
        lookup_table[object] = new_table
        for key, value in pairs(object) do
            new_table[_copy(key)] = _copy(value)
        end
        return setmetatable(new_table, _copy(getmetatable(object)))
    end
    return _copy(object)
end

--Create an class.
local function class(base)
    base = base or {}
    if not base.ctor then
        base.ctor = function() end
    end
    local cls = {}

    setmetatable(cls, {__index = base})

    function cls.new(...)
        local instance = clone(cls)
        instance:ctor(...)
        return instance
    end

    return cls
end

local function super_ctor(cls, self, ...)
	local super = getmetatable(cls).__index
	if super and super.__ctor then
		super_ctor(super, self, ...)
		super.__ctor(self, ...)
	end
end

local function extend_class(base_class)
	local new_class = {}
	new_class.__index = new_class

	setmetatable(new_class, {
	    __index = base_class,
	    __call = function (cls, ...)
	        local self = setmetatable({}, cls)
	        super_ctor(cls, self, ...)
	        self:__ctor(...)
	        return self
	    end,
	})

	return new_class
end


local function create_object()
	local new_class = {}
	new_class.__index = new_class

	setmetatable(new_class, {
		__call = function (cls, ...)
			local self = setmetatable({}, cls)
			self:__ctor(...)
			return self
		end,
	})

	return new_class
end

local function extend_class_by_copy(base_class)
	local child_class = {}
	for i, v in pairs(base_class) do
		child_class[i] = v
	end

	child_class.__index = child_class

	setmetatable(child_class, {
		__call = function (cls, ...)
			local self = setmetatable({}, cls)
			self:__ctor(...)
			return self
		end,
	})

	return child_class
end

return {
	create_object = create_object,
	extend_class_by_copy = extend_class_by_copy,
	class = class,
    extend_class = extend_class,
}