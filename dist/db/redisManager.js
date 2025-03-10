import { redisClient } from "../config/redis.js";
const setValue = async (key, value) => {
    await redisClient.v4.set(key, value, "EX");
};
const getValue = async (key) => {
    return redisClient.v4.get(key);
};
const setArray = async (key, array) => {
    const arrayString = JSON.stringify(array);
    await redisClient.v4.set(key, arrayString, "EX");
};
const getArray = async (key) => {
    const arrayString = await redisClient.v4.get(key);
    return arrayString ? JSON.parse(arrayString) : null;
};
const deleteValue = async (key) => {
    await redisClient.v4.del(key);
};
const setExpire = async (key, ttl) => {
    return redisClient.v4.expire(key, ttl);
};
export { setValue, getValue, deleteValue, setArray, getArray, setExpire };
