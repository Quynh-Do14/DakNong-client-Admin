export const converMasterData = (data, type) => {
    let convert = [];
    convert = data?.filter((it) => it.type === type);
    return convert;
}