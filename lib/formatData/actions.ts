type NetworthLast6 = {
  year: number;
  month: number;
  networth: number;
  isUser: boolean;
};

export function CompleteNetworth(NetworthLast6: NetworthLast6[]) {
  const date = new Date();
  let year: number;
  let month: number;
  let networth: number;

  try {
    year = NetworthLast6.at(-1)?.year!;
    month = NetworthLast6.at(-1)?.month!;
    networth = NetworthLast6.at(-1)?.networth!;
  } catch {
    year = date.getFullYear();
    month = date.getMonth();
    networth = 10000;

    NetworthLast6.push({
      year: year,
      month: month,
      networth: networth,
      isUser: false,
    });
  }

  while (NetworthLast6.length != 6) {
    month++;
    networth = networth * 1.45;

    if (month === 13) {
      month = 1;
      year += 1;
    }

    NetworthLast6.push({
      year: year,
      month: month,
      networth: networth,
      isUser: false,
    });
  }

  return NetworthLast6;
}
