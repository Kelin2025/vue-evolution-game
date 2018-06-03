# Evolution game

## TODO

* [ ] Implement basic models
* [ ] Implement cards
* [ ] Implement game mechanics
* [ ] Implement game UI (help wanted)

## Cards implementation

### Basic cards

* [x] Fat
* [x] Grazing
* [x] High body weight
* [x] Mimicry
* [x] Poisonous
* [x] Running
* [x] Swimming
* [x] Tail loss
* [ ] Communication
* [ ] Hibernation
* [ ] Carnivorous
* [ ] Scavenger
* [ ] Symbiosys
* [ ] Piracy
* [ ] Cooperation
* [x] Burrowing
* [x] Camouflage
* [x] Sharp vision
* [ ] Parasite

### DLC "Time to fly"

* [ ] Specialization
* [ ] Trematoda
* [ ] Metamorphosis
* [ ] Ink cloud
* [ ] Live birth
* [ ] Ambush
* [ ] Flying

## Events implementation

### Basic creature events

* [ ] onCreatureBirths
* [x] onCreatureDies
  * [x] Reason: not enough food
  * [x] Reason: another creature attacked
  * [x] Reason: poison effect
* [x] onCreatureAttacks
  * [x] Swap targets mechanics (?)
  * [x] Calls onCreatureDefends for target
* [x] onCreatureDefends
  * [x] Can defend creature
  * [x] Can swap target (e.g. for mimicry)
  * [x] Causes death if no one effect saved creature
* [ ] onCreatureReceivesFood
  * [ ] Different types of food: red/blue
  * [ ] Detect if it was stolen from another creature (e.g. for piracy)

### Basic game events

* [ ] onStageStart
* [ ] onStageEnd
* [ ] onTurnStart
* [ ] onTurnEnd
* [ ] onGameStart
* [ ] onGameEnd
* [ ] Make all creature events can be listened anywhere
