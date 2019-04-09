function keymap1SliceSelect(val){
  return {keyHeld: [[], [KEY_SHIFTLEFT]],
          type: [FUNC_SELECT_SLICE, FUNC_SELECTTOGGLE],
          val: [val, val]}
}

// l-layer; s-slice
let keymap_standard = {
	// layer
	[KEY_DIGIT1]: {keyHeld: [[]],
                       type: [FUNC_SELECT_LAYER],
                       val: [1]}, // 1
	[KEY_DIGIT2]: {keyHeld: [[]],
                       type: [FUNC_SELECT_LAYER],
                       val: [2]}, // 2
	[KEY_DIGIT3]: {keyHeld: [[]],
                       type: [FUNC_SELECT_LAYER],
                       val: [3]}, // 3
	[KEY_DIGIT4]: {keyHeld: [[]],
                       type: [FUNC_SELECT_LAYER],
                       val: [4]}, // 4

	// slice
	[KEY_Q]: keymap1SliceSelect(1), // q
	[KEY_W]: keymap1SliceSelect(3), // w
	[KEY_E]: keymap1SliceSelect(5), // e
	[KEY_R]: keymap1SliceSelect(7), // r
	[KEY_T]: keymap1SliceSelect(9), // t
	[KEY_Y]: keymap1SliceSelect(11), // y
	[KEY_U]: keymap1SliceSelect(13), // u
	[KEY_I]: keymap1SliceSelect(15), // i

	[KEY_A]: keymap1SliceSelect(2), // a
	[KEY_S]: keymap1SliceSelect(4), // s
	[KEY_D]: keymap1SliceSelect(6), // d
	[KEY_F]: keymap1SliceSelect(8), // f
	[KEY_G]: keymap1SliceSelect(10), // h
	[KEY_H]: keymap1SliceSelect(12), // h
	[KEY_J]: keymap1SliceSelect(14), // j
	[KEY_K]: keymap1SliceSelect(16), // k

	// shape
	[KEY_Z]: {keyHeld: [[]],
                  type: [FUNC_CHANGE_SHAPE],
                  val: [0]}, // z
	[KEY_X]: {keyHeld: [[]],
                  type: [FUNC_CHANGE_SHAPE],
                  val: [3]}, // x
	[KEY_C]: {keyHeld: [[]],
                  type: [FUNC_CHANGE_SHAPE],
                  val: [4]}, // c
	[KEY_V]: {keyHeld: [[]],
                  type: [FUNC_CHANGE_SHAPE],
                  val: [5]}, // v
	[KEY_B]: {keyHeld: [[]],
                  type: [FUNC_CHANGE_SHAPE],
                  val: [6]}, // b
	[KEY_N]: {keyHeld: [[]],
                  type: [FUNC_CHANGE_SHAPE],
                  val: [8]}, // n

	// rotate
	[KEY_MINUS]: {keyHeld: [[]],
                  type: [FUNC_ROTATE],
                  val: ['l']}, // -
	[KEY_EQUAL]: {keyHeld: [[]],
                  type: [FUNC_ROTATE],
                  val: ['r']}, // =

	[KEY_SPACE]: {keyHeld: [[]],
                  type: [FUNC_PLAY],
                  val: [null]}, // SPACE
	[KEY_ENTER]: {keyHeld: [[]],
                  type: [FUNC_TOGGLE],
                  val: [null]} // ENTER
}
