export const emailTemplates = {
    REDIS_ERROR: {
        subject: "⚰️자동 주식 매매 REDIS STATUS ERROR⚰️",
        content: (data) => `REDIS 데이터가 초기화되어 구동 문제가 생겨 서버를 종료합니다.`,
    },
    SEQUENCE_ERROR: {
        subject: "🧨자동 주식 매매 오류 서버 종료🧨",
        content: (data) => `지속적인 5회 오류로 인해 서버를 종료합니다.`,
    },
    TRADING_TIMING: {
        subject: "💵자동 주식 매매 거래 타이밍 알림💵",
        content: (data) => `${data.date} <br> ${data.bollinger}로 매수/매도 타이밍입니다.`,
    },
    TRADING_RESULT: {
        subject: "💵자동 주식 매매 결과 알림💵",
        content: (data) => `이전 평가 금액 : ${data.beforePrice}, 당일 평가 금액 : ${data.afterPrice}, 당일 수익률 : ${data.result}% 입니다.`,
    },
    TRADING_TRY: {
        subject: "💵자동 주식 매매 거래 알림💵",
        content: (data) => `현재 날짜 ${data.date}, rsi ${data.rsi}, bPercent ${data.bPercent} 도달 <br> ${data.symbolName} 종목, 거래가 ${data.money}, ${data.tradingCount}주 ${data.type}하였습니다.`,
    },
    TRADING_CUT_OFF: {
        subject: "🚬자동 주식 매매 손절 알림🚬",
        content: (data) => `손절가 ${data.cutOffPrice}, 현재가 ${data.currentPrice} <br> ${data.symbol} 종목, 손절가 ${data.money}, ${data.tradingCount}주 ${data.type}하였습니다.`,
    },
    TRADING_TIME_OUT: {
        subject: "💈거래 기간 초과💈",
        content: (data) => `거래 시간 초과로 인해 미체결 거래 청산`,
    },
    TIMEING: {
        subject: "주식 매매 타이밍",
        content: (data) => `$시가 기준 볼린저 밴드 ${data.bPercent} 도달`,
    },
};
