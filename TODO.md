Weekend Todo:
- [ ] Refactor tile drawing data and code
  - [ ] gemerateTilemap generates data tilemap and drawing tilemap
  - [ ] generateDrawingTilemap() is game specific
  - [ ] drawingTilemap assumes 2D tilesheet where each row is a tiletype and each column is an alternate graphic for that tiletype
  - [ ] drawTile() should be a method of TileMap
  - [ ] drawTileMap() is game specific
- [ ] Exploding block logic
  - [ ] blinks when about to explode
  - [ ] explosion triggers other exploding blocks in blast radius
  - [ ] damages player if in blast radius
- [ ] falling block logic
  - [ ] falls when void is created underneath by digging
  - [ ] fall when void already exists below and is dug or touched by diggerang
//testing multi-push
