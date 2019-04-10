function keymap16thSliceSelect(val){
  return {keyHeld: [[], [KEY_SHIFTLEFT]],
          type: [FUNC_SELECT16THSLICE, FUNC_SELECT16THSLICETOGGLE],
          val: [val, val]}
}

// l-layer; s-slice
let keymap_16th = {
	// layer
	[KEY_DIGIT1]: {keyHeld: [[]],
                       type: [FUNC_SELECT16THGROUP],
                       val: [0]}, // 1
	[KEY_DIGIT2]: {keyHeld: [[]],
                       type: [FUNC_SELECT16THGROUP],
                       val: [1]}, // 2
	[KEY_DIGIT3]: {keyHeld: [[]],
                       type: [FUNC_SELECT16THGROUP],
                       val: [2]}, // 3
	[KEY_DIGIT4]: {keyHeld: [[]],
                       type: [FUNC_SELECT16THGROUP],
                       val: [3]}, // 4

	[KEY_BACKSLASH]: {keyHeld: [[]],
                       type: [FUNC_NEXTLAYER],
                       val: [null]}, // 4

	// slice
	[KEY_D]: keymap16thSliceSelect(1),
	[KEY_F]: keymap16thSliceSelect(2),
	[KEY_G]: keymap16thSliceSelect(3),
	[KEY_H]: keymap16thSliceSelect(4), 

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
