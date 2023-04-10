const { AudioPlayer, StreamType, joinVoiceChannel, createAudioResource } = require('@discordjs/voice');
const discordTTS = require("discord-tts");
const callMemberName = {
    async callMemernameInVoiceChannel(oldState, newState, client) {
        const voiceChannel = newState.member.voice.channel;
        let audioPlayer = new AudioPlayer();
        if (!oldState.channel && newState.channel && !newState.member.user.bot) {
            const stream = discordTTS.getVoiceStream(`ជំរាបសួរ ${newState.member.displayName}`);
            const audioResource = createAudioResource(stream, { inputType: StreamType.Arbitrary, inlineVolume: true });
            setTimeout(async () => {
                const connection = joinVoiceChannel({
                    channelId: voiceChannel.id,
                    guildId: voiceChannel.guild.id,
                    adapterCreator: voiceChannel.guild.voiceAdapterCreator
                })
                connection.subscribe(audioPlayer);
                audioPlayer.play(audioResource);
                setTimeout(() => {
                    connection.disconnect();
                  }, 50000); 
            }, 10000)
            setTimeout(() => {
                connection.disconnect();
              }, 2 * 60 * 1000); // Destroy client after 5 minutes and 3 seconds
        }
    }
}
module.exports = callMemberName;