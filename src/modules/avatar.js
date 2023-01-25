// import Project from './project'
// import List from './ToDoList'
import Storage from './storage'

const Avatar = (() => {
  const avatar = {
    currentLevel: 1,
    1: {
      title: 'Novice',
      characterImg: 'novice.png',
      nextLvlScore: 2,
      thisLvlMinScore: 0,
    },
    2: {
      title: 'Student',
      characterImg: 'student.png',
      nextLvlScore: 5,
      thisLvlMinScore: 2,
    },
    3: {
      title: 'Apprentice',
      characterImg: 'apprentice.png',
      nextLvlScore: 10,
      thisLvlMinScore: 5,
    },
    4: {
      title: 'Bandit',
      characterImg: 'bandit.png',
      nextLvlScore: 20,
      thisLvlMinScore: 10,
    },
    5: {
      title: 'Warrior',
      characterImg: 'warrior.png',
      nextLvlScore: 50,
      thisLvlMinScore: 20,
    },
    6: {
      title: 'Boss',
      characterImg: 'boss.png',
      nextLvlScore: 100,
      thisLvlMinScore: 50,
    },

    getAvatarCompletedTasks() {
      const list = Storage.getList()
      return list.getProject('Completed').getTasksCompleted().length
    },

    getAvatarLevel() {
      const totalScore = this.getAvatarCompletedTasks()
      // DEMOTE LVL IF TO LITTLE POINTS
      let scoreTemp = totalScore
      while (scoreTemp >= 0) {
        // PROMOTE LVL IF TO ENOUGH POINTS
        if (scoreTemp - this[this.currentLevel].nextLvlScore >= 0) {
          scoreTemp -= this[this.currentLevel].nextLvlScore
          this.currentLevel += 1
        } else if (totalScore < this[this.currentLevel].thisLvlMinScore) {
          this.currentLevel -= 1
        } else {
          break
        }
      }
      console.log(this.currentLevel)
      return this.currentLevel
    },

    getAvatarScore() {
      const totalScore = this.getAvatarCompletedTasks()
      const currentLevel = this.getAvatarLevel()
      return `${totalScore} / ${this[currentLevel].nextLvlScore}`
    },

    getAvatarTitle() {
      const currentLevel = this.getAvatarLevel()
      return this[currentLevel].title
    },

    getAvatarImage() {
      const currentLevel = this.getAvatarLevel()
      return this[currentLevel].characterImg
    },
  }

  return { avatar }
})()

export default Avatar
