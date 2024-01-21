(script = registerScript({
    name: "ChatFilter",
    version: "0.1",
    authors: ["N"]
})).import("Core.lib");

count = 0;

keywords = [
    "点击右侧链接",
    "t.cn",
    ".xyz",
    "smg520",
    "加q",
    "maikama.cn",
    "q群",
    "企鹅",
    "企鹅群",
    "要开挂的",
    "免费外挂",
    "点击链接",
    "anfaka.com",
    "jq.qq.com",
    "不空刀",
    "加群",
    "稳定奔放",
    "免费获取",
    "杀戮不空刀",
    "内部",
    "包教包会",
    "外部群",
    "小卖部",
    "僵尸"
];

module = {
    category: "Misc",
    values: [showCountValue = value.createBoolean("ShowCount", true)],
    tag: showCountValue.get() ? count.toString() : "",
    onPacket: function (event) {
        if (!(event.getPacket() instanceof S02PacketChat)) return;
        
        keywords.forEach(function(it) {
            if (event.getPacket().getChatComponent().getUnformattedText().indexOf(it) + 1) {//index == -1 => continue
                event.cancelEvent();
                count++;
                return;
            }
        });
    }
}
