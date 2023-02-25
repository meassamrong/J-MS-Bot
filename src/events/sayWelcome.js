const callMemberName={
    if(userJoin){
        joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator
        })
    }
}

module.exports = callMemberName;