import Character from '../Character';
import Bowman from '../Bowman';
import Swordsman from '../Swordsman';
import Magician from '../Magician';
import Daemon from '../Daemon';
import Undead from '../Undead';
import Zombie from '../Zombie';

describe('Character class', () => {
  test('should create character with valid name and type', () => {
    const char = new Character('Legolas', 'Bowman');
    expect(char.name).toBe('Legolas');
    expect(char.type).toBe('Bowman');
    expect(char.health).toBe(100);
    expect(char.level).toBe(1);
    expect(char.attack).toBe(0);
    expect(char.defence).toBe(0);
  });

  test('should throw error if name is too short', () => {
    expect(() => new Character('A', 'Bowman')).toThrow('Name must be a string of length between 2 and 10');
  });

  test('should throw error if name is too long', () => {
    expect(() => new Character('VeryLongName', 'Bowman')).toThrow('Name must be a string of length between 2 and 10');
  });

  test('should throw error if name is not a string', () => {
    expect(() => new Character(123, 'Bowman')).toThrow('Name must be a string of length between 2 and 10');
  });

  test('should throw error if type is invalid', () => {
    expect(() => new Character('Legolas', 'Elf')).toThrow('Invalid character type');
  });

  test('levelUp should increase level, attack, defence and set health to 100', () => {
    const char = new Character('Legolas', 'Bowman');
    char.attack = 20;
    char.defence = 20;
    char.levelUp();
    expect(char.level).toBe(2);
    expect(char.attack).toBe(24);
    expect(char.defence).toBe(24);
    expect(char.health).toBe(100);
  });

  test('levelUp should throw error if health is 0', () => {
    const char = new Character('Legolas', 'Bowman');
    char.health = 0;
    expect(() => char.levelUp()).toThrow('Cannot level up a dead character');
  });

  test('damage should reduce health correctly considering defence', () => {
    const char = new Character('Legolas', 'Bowman');
    char.defence = 25;
    char.damage(50);
    expect(char.health).toBe(100 - 50 * (1 - 0.25));
  });

  test('damage should not allow health to go below 0', () => {
    const char = new Character('Legolas', 'Bowman');
    char.health = 10;
    char.defence = 0;
    char.damage(100);
    expect(char.health).toBe(0);
  });
});

describe('Child classes', () => {
  const testCases = [
    { Class: Bowman, type: 'Bowman', attack: 25, defence: 25 },
    { Class: Swordsman, type: 'Swordsman', attack: 40, defence: 10 },
    { Class: Magician, type: 'Magician', attack: 10, defence: 40 },
    { Class: Daemon, type: 'Daemon', attack: 10, defence: 40 },
    { Class: Undead, type: 'Undead', attack: 25, defence: 25 },
    { Class: Zombie, type: 'Zombie', attack: 40, defence: 10 },
  ];

  testCases.forEach(({ Class, type, attack, defence }) => {
    test(`${type} should have correct attack/defence`, () => {
      const character = new Class('Hero');
      expect(character.type).toBe(type);
      expect(character.attack).toBe(attack);
      expect(character.defence).toBe(defence);
    });
  });
});