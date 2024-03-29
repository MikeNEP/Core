(script = registerScript({
    name: "SprintPatch",
    authors: ["NEP"],
    version: "1.4"
})).import("Core.lib");

module = {
    description: "Bypass un nuevo movimiento OLD",
    category: "Patches",
    values: [
        nopacketspatch = value.createBoolean("NoPacketsPatch", true),
        jumpdirectionpatch = value.createBoolean("JumpDirectionPatch", true),
        strafepatch = value.createBoolean("OnGroundStrafePatch", true)
    ],
    onPacket: function (e) {
        if (nopacketspatch.get() && e.getPacket() instanceof C0BPacketEntityAction && (e.getPacket().getAction() == "START_SPRINTING" || e.getPacket().getAction() == "STOP_SPRINTING")) e.cancelEvent();
    },
    onJump: function (e) {
        if (jumpdirectionpatch.get() && !modified) {
            e.cancelEvent();
            var prevYaw = mc.thePlayer.rotationYaw;
            mc.thePlayer.rotationYaw = Math.toDegrees(MovementUtils.getDirection());
            modified = true;
            mc.thePlayer.jump();
            mc.thePlayer.rotationYaw = prevYaw;
            modified = false;
        }
    },
    onMotion: function (e) {
        if (strafepatch.get() && e.getEventState() == "PRE" && mc.thePlayer.onGround) MovementUtils.strafe();
    }
}

var modified;
