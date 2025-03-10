const retryOperation = async (operation, maxRetries = 3, delay = 1000) => {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            return await operation();
        }
        catch (error) {
            console.error(`재시도 ${attempt}/${maxRetries} 실패:`, error);
            if (attempt === maxRetries)
                throw error;
            await new Promise((resolve) => setTimeout(resolve, delay * attempt));
        }
    }
};
export default retryOperation;
