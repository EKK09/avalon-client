export const sleep = async (sec = 1) => new Promise((res) => {
  setTimeout(res, sec * 1000);
});
