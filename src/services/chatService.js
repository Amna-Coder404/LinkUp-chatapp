
export const createConversation = async (client, currentUserId, otherUserId) => {
    if (!client) {
        throw new Error("Stream client is missing.");
    }

    if (!currentUserId || !otherUserId) {
        throw new Error("Both users are required.");
    }

    if (currentUserId === otherUserId) {
        throw new Error("You cannot chat with yourself.");
    }

    // This is create tab Between to user likr amna <---> zoha

    const channel = client.channel("messaging", {
        members: [
            currentUserId,
            otherUserId,
        ],
    });


    await channel.watch();


    return channel;
};