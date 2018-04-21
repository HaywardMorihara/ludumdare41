function initializeNestGroup(game) {
	nestGroup = game.add.group();
    nestGroup.enableBody = true;
    nest = nestGroup.create(300, 300, 'nest');
    egg = nestGroup.create(320, 300, 'egg');
    return nestGroup;
}