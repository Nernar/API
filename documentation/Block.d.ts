/**
 * Module used to create and manipulate blocks. The difference between terms 
 * "block" and "tile" is in its usage: blocks are used in the inventory, 
 * tiles are placed in the world and have different ids for some vanilla blocks. 
 * Use [[Block.convertBlockToItemId]] and [[Block.convertItemToBlockId]]
 */
declare namespace Block {
    /**
     * @param id string id of the block
     * @returns block numeric id by its string id or just returns its numeric id 
     * if input was a numeric id
     */
    function getNumericId(id: string): number;

    /**
     * Creates new block using specified params
     * @param namedID string id of the block. You should register it via 
     * [[IDRegistry.genBlockID]] call first
     * @param defineData array containing all variations of the block. Each 
     * variation corresponds to block data value, data values are assigned 
     * according to variations order
     * @param blockType [[SpecialType]] object, either java-object returned by
     * [[Block.createSpecialType]] or js-object with the required properties, 
     * you can also pass special type name, if the type was previously 
     * registered
     */
    function createBlock(namedID: string, defineData: BlockVariation[], blockType: SpecialType|string): void;

    /**
     * Creates new block using specified params, creating four variations for 
     * each of the specified variations to be able to place it facing flayer 
     * with the front side and defines the appropriate behavior. Useful for 
     * different machines and mechanisms
     * @param namedID string id of the block. You should register it via 
     * [[IDRegistry.genBlockID]] call first
     * @param defineData array containing all variations of the block. Each 
     * variation corresponds to four block data values, data values are assigned 
     * according to variations order
     * @param blockType [[SpecialType]] object, either java-object returned by
     * [[Block.createSpecialType]] or js-object with the required properties, 
     * you can also pass special type name, if the type was previously 
     * registered
     */
    function createBlockWithRotation(namedID: string, defineData: BlockVariation[], blockType: SpecialType|string): void;

    /**
     * @param id numeric block id
     * @returns true, if the specified block id is a vanilla block
     */
    function isNativeTile(id: number): boolean;

    /**
     * Converts tile id to the block id
     * @param id numeric tile id
     * @returns numeric block id corresponding to the given tile id
     */
    function convertBlockToItemId(id: number): number;

    /**
     * Converts block id to the tile id
     * @param id numeric tile id
     * @returns numeric tile id corresponding to the given block id
     */
    function convertItemToBlockId(id: number): number;

    /**
     * Same as [[Block.registerDropFunction]] but accepts only numeric 
     * tile id as the first param
     */
    function registerDropFunctionForID(numericID: number, dropFunc: DropFunction, level?: number): boolean;

    /**
     * Registers function used by Core Engine to determine block drop for the 
     * specified block id
     * @param numericID tile string or numeric id
     * @param dropFunc function to be called to determine what will be dropped 
     * when the block is broken
     * @param level if level is specified and is not 0, digging level of the
     * block is additionally set
     * @returns true, if specified string or numeric id exists and the function
     * was registered correctly, false otherwise
     */
    function registerDropFunction(namedID: string|number, dropFunc: DropFunction, level?: number): boolean;

    /**
     * Same as [[Block.registerPopResourcesFunction]] but accepts only numeric 
     * tile id as the first param
     */
    function registerPopResourcesFunctionForID(numericID: number, func: PopResourcesFunction): void;

    /**
     * Registeres function used by Core Engine to determine block drop for the 
     * specified block id
     * @param namedID tile string or numeric id 
     * @param func function to be called when a block in the world is broken by
     * environment (explosions, pistons, etc.)
     * @returns true, if specified string or numeric id exists and the function
     * was registered correctly, false otherwise
     */
    function registerPopResourcesFunction(namedID: string|number, func: PopResourcesFunction): void;

    /**
     * Same as [[Block.setDestroyLevel]] but accepts only numeric 
     * tile id as the first param
     */
    function setDestroyLevelForID(id: number, level: number, resetData: boolean): void;

    /**
     * Registers a default destroy function for the specified block, considering
     * its digging level
     * @param namedID tile string id
     * @param level digging level of the block
     * @param resetData if true, the block is dropped with data equals to 0
     */
    function setDestroyLevel(namedID: string|number, level: number, resetData: boolean): void;

    /**
     * Sets destroy time for the block with specified id
     * @param namedID string or numeric block id
     * @param time destroy time for the block, in ticks
     */
    function setDestroyTime(namedID: string|number, time: number): void;

    /**
     * @param numericID numeric block id
     * @returns true, if block is solid, false otherwise
     */
    function isSolid(numericID: number): boolean;

    /**
     * @param numericID numeric block id
     * @returns destroy time of the block, in ticks
     */
    function getDestroyTime(numericID: number): number;

    /**
     * @param numericID numeric block id
     * @returns explostion resistance of the block
     */
    function getExplosionResistance(numericID: number): number;

    /**
     * @param numericID numeric block id
     * @returns friction of the block
     */
    function getFriction(numericID: number): number;

    /**
     * @param numericID numeric block id
     * @returns translucency of the block
     */
    function getTranslucency(numericID: number): number;

    /**
     * @param numericID numeric block id
     * @returns light level, emmited by block, from 0 to 15
     */
    function getLightLevel(numericID: number): number;

    /**
     * @param numericID numeric block id
     * @returns light opacity of the block, from 0 to 15
     */
    function getLightOpacity(numericID: number): number;

    /**
     * @param numericID numeric block id
     * @returns render layer of the block
     */
    function getRenderLayer(numericID: number): number;

    /**
     * @param numericID numeric block id
     * @returns render type of the block
     */
    function getRenderType(numericID: number): number;

    /**
     * Temporarily sets destroy time for block, saving the old value for the 
     * further usage
     * @param numericID numeric block id
     * @param time new destroy time in ticks
     */
    function setTempDestroyTime(numericID: number, time: number): void;

    /**
     * Registers material and digging level for the specified block
     * @param namedID block numeric or string id
     * @param material material name
     * @param level block's digging level
     */
    function setBlockMaterial(namedID: string|number, material: string, level: number): void;

    /**
     * Makes block accept redstone signal
     * @param namedID block numeric or string id
     * @param data block data, currently not used
     * @param isRedstone if true, the redstone changes at the block will notify
     * the "RedstoneSignal" callback
     */
    function setRedstoneTile(namedID: string|number, data: number, isRedstone: boolean): void;

    /**
     * Gets drop for the specified block. Used mostly by Core Engine's 
     * [[ToolAPI]], though, can be useful in the mods, too
     * @param block block info
     * @param item item that was (or is going to be) used to break the block
     * @param coords coordinates where the block was (or is going to be) broken 
     * @returns block drop, the array of arrays, each containing three values: 
     * id, count and data respectively
     */
    function getBlockDropViaItem(block: Tile, item: ItemInstance, coords: Vector): [number, number, number][];

    /**
     * Same as [[Block.registerPlaceFunction]] but accepts only numeric 
     * tile id as the first param
     */
    function registerPlaceFunctionForID(block: number, func: PlaceFunction): void;

    /**
     * Registers function to be called when the block is placed in the world
     * @param namedID block numeric or string id
     * @param func function to be called when the block is placed in the world
     */
    function registerPlaceFunction(namedID: string|number, func: PlaceFunction): void;

    /**
     * Sets block box shape
     * @param id block numeric id
     * @param pos1 block lower corner position, in voxels (1/16 of the block)
     * @param pos2 block upper conner position, in voxels (1/16 of the block)
     * @param data block data
     */
    function setBlockShape(id: number, pos1: Vector, pos2: Vector, data: number): void;

    /**
     * Same as [[Block.setBlockShape]], but accepts coordinates as scalar 
     * params, not objects
     * @param id block numeric id
     * @param data  block data
     */
    function setShape(id: number, x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, data: number): void;

    /**
     * Creates a new special type using specified params and registers it by 
     * name
     * @param description special type properties
     * @param nameKey string name to register the special type
     */
    function createSpecialType(description: SpecialType, nameKey: string): number;

    /**
     * @deprecated No longer supported
     */
    function setPrototype(namedID: string|number, Prototype: any): number;

    /**
     * Makes block invoke callback randomly depending on game speed
     * @param id block id to register for random ticks
     * @param callback function to be called on random block tick
     */
    function setRandomTickCallback(id: number, callback: RandomTickFunction): void;

    /**
     * Makes block invoke callback randomly depending on game speed. Occurs more 
     * often then [[Block.setRandomTickCallback]] and only if the block is not
     * far away from player
     * @param id block id to register
     * @param callback function to be called 
     */
    function setAnimateTickCallback(id: number, callback: AnimateTickFunction): void;

    function registerNeighbourChangeFunction(id: number, func: NeighourChangeFunction): void;


    /**
     * Special types are used to set properties to the block. Unlike items, 
     * blocks properties are defined using special types, due to old Inner 
     * Core's block ids limitations 
     */
    interface SpecialType {
        /**
         * Unique string identifier of the SpecialType
         */
        name?: string,

        /**
         * Vanilla block ID to inherit some of the properties. Default is 0
         */
        base?: number,

        /**
         * Block material constant. Default is 3
         */
        material?: number,

        /**
         * If true, the block is not transparent. Default is false
         */
        solid?: boolean,

        /**
         * If true, all block faces are rendered, otherwise back faces are not
         * rendered (for optimization purposes). Default is false
         */
        renderallfaces?: boolean,

        /**
         * Sets render type of the block. Default is 0 (full block), use other 
         * values to change block's shape
         */
        rendertype?: number,

        /**
         * Specifies the layer that is used to render the block. Default is 4
         */
        renderlayer?: number,

        /**
         * If non-zero value is used, the block emits light of that value. 
         * Default is false, use values from 1 to 15 to set light level
         */
        lightlevel?: number,

        /**
         * Specifies how opaque the block is. Default is 0 (solid), use values 
         * from 1 to 15 to make the block opaque
         */
        lightopacity?: number,

        /**
         * Specifies how block resists to the explosions. Default value is 3
         */
        explosionres?: number,

        /**
         * Specifies how player walks on this block. The higher the friction is,
         * the more difficult it is to change speed and direction. Default value
         * is 0.6000000238418579
         */
        friction?: number,

        /**
         * Specifies the time required to destroy the block, in ticks
         */
        destroytime?: number,

        /**
         * Detirmines the way the light passes through the block, if it is not
         * opaque
         */
        translucency?: number,
    }


    /**
     * Object used to represent single block variation
     */
    interface BlockVariation {
        /**
         * Variation name, displayed as item name everywhere. Default value is
         * *"Unknown Block"*
         */
        name?: string,

        /**
         * Variation textures, array containing pairs of texture name and data.
         * Texture file should be located in items-opaque folder and its name
         * should be in the format: *name_data*, e.g. if the file name is 
         * *ignot_copper_0*, you should specifiy an array 
         * ```js 
         * ["ignot_copper", 0]
         * ```
         * There should be from one to six texture 
         * pairs in the array, if less then six variations are specified, the 
         * last texture is used for missing textures. The sides go in the 
         * following order:
         * ```js 
         * texture: [
         *   ["название1", индекс1], // bottom
         *   ["название2", индекс2], // top
         *   ["название3", индекс3], // back
         *   ["название4", индекс4], // front
         *   ["название5", индекс5], // left
         *   ["название6", индекс6]  // right
         * ]
         * ```
         */
        textures: [string, number][]

        /**
         * If true, block variation will be added to creative inventory
         */
        inCreative?: boolean,
    }

    /**
     * Function used to determine block drop
     * @param blockCoords coordinates where the block is destroyed and side from
     * where it is destroyed
     * @param blockID numeric tile id
     * @param blockData block data value
     * @param diggingLevel level of the tool the block was digged with
     * @returns block drop, the array of arrays, each containing three values: 
     * id, count and data respectively
     */
    interface DropFunction {
        (blockCoords: Callback.ItemUseCoordinates, blockID: number, blockData: number, diggingLevel: number): [number, number, number][]
    }

    /**
     * Function used to determine when block is broken by
     * environment (explosions, pistons, etc.)
     * @param blockCoords coordinates where the block is destroyed and side from
     * where it is destroyed
     * @param block information about block that is broken
     * @param f unknown floating-point param
     * @param i unknown integer param
     */
    interface PopResourcesFunction {
        (blockCoords: Vector, block: Tile, f: number, i: number): void
    }


    /**
     * Function used to determine when block is placed in the world
     * @param coords set of all coordinate values that can be useful to write 
     * custom use logics
     * @param item item that was in the player's hand when he touched the block
     * @param block block that was touched
     * @returns coordinates where to actually place the block, or void for 
     * default placement
     */
    interface PlaceFunction {
        (coords: Callback.ItemUseCoordinates, item: ItemInstance, block: Tile): Vector|void
    }


    /**
     * Function used to track random block ticks
     * @param x x coordinate of the block that ticked
     * @param y y coordinate of the block that ticked
     * @param z z coordinate of the block that ticked
     * @param id block id
     * @param data block data
     */
    interface RandomTickFunction {
        (x: number, y: number, z: number, id: number, data: number): void
    }


    /**
     * Function used to track random block animation ticks
     * @param x x coordinate of the block that should be updated
     * @param y y coordinate of the block that should be updated
     * @param z z coordinate of the block that should be updated
     * @param id block id
     * @param data block data
     */
    interface AnimateTickFunction {
        (x: number, y: number, z: number, id: number, data: number): void
    }

    interface NeighourChangeFunction {
        (coords: Vector, block: Tile, changedCoords: Vector): void
    }
}