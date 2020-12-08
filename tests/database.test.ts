import Mongoose from 'mongoose'
import { IArticle } from '../src/interfaces/article.interface'
import { IJournal } from '../src/interfaces/journal.interface'
import { Article, Journal } from '../src/models'

function connectToDatabase() {
  return Mongoose.connect('mongodb://localhost:27017/vidijo', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
}

test('Create journal', async () => {
  const mongoose = await connectToDatabase()

  await Journal.deleteMany()

  const journal: IJournal = new Journal({
    title: 'TestTitle',
    issn: '1234-5678',
    eissn: '5678-1234',
  })

  await journal.save()

  const savedJournal: IJournal | null = await Journal.findOne().exec()

  expect(savedJournal).not.toBeNull()
  expect(savedJournal?.title).toEqual('TestTitle')
  expect(savedJournal?.issn).toEqual('1234-5678')
  expect(savedJournal?.eissn).toEqual('5678-1234')

  await mongoose.connection.close()
})

test('Create article', async () => {
  const mongoose = await connectToDatabase()

  await Article.deleteMany()

  const article: IArticle = new Article({
    title: 'TestArticle',
    abstract: 'TestAbstract',
    doi: '10.3390/app9061231',
  })

  await article.save()

  const savedArticle: IArticle | null = await Article.findOne().exec()

  expect(savedArticle).not.toBeNull()
  expect(savedArticle?.title).toEqual('TestArticle')
  expect(savedArticle?.source).toEqual('https://doi.org/10.3390/app9061231')

  await mongoose.connection.close()
})

test('Try saving a duplicate article', async () => {
  const mongoose = await connectToDatabase()

  await Article.deleteMany()

  const article: IArticle = new Article({
    title: 'TestArticle',
    abstract: 'TestAbstract',
    doi: '10.3390/app9061231',
  })

  await article.save()

  let duplicateNotSaved = false
  try {
    await article.save()
  } catch (err) {
    duplicateNotSaved = true
  }

  expect(duplicateNotSaved).toBe(true)

  const savedArticle: IArticle | null = await Article.findOne().exec()

  expect(savedArticle).not.toBeNull()
  expect(savedArticle?.title).toEqual('TestArticle')
  expect(savedArticle?.source).toEqual('https://doi.org/10.3390/app9061231')

  await mongoose.connection.close()
})
