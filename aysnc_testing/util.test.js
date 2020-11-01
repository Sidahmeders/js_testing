jest.mock('./http')

const { loadTitle } = require('./util')

test('shoud print UpperCase text', async () => {
    const title = await loadTitle()
    expect(title).toBe('DELECTUS AUT AUTEM')
})
