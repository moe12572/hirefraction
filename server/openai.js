'use server'

import { OpenAI } from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
})

export const generatePlayerDescription = async (player) => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant.',
        },
        {
          role: 'user',
          content: `Provide a brief description of the baseball player: ${player.Player}, who is ${player.AgeThatYear} years old, with ${player.Hits} hits in the year ${player.Year}.`,
        },
      ],
      temperature: 0.2,
      max_tokens: 500,
      top_p: 0.9,
      frequency_penalty: 0.5,
      presence_penalty: 0.3,
    })
    return response.choices[0].message.content.trim()
  } catch (error) {
    console.error('OpenAI API error:', error.response ? error.response.data : error.message)
    throw new Error('Failed to generate description')
  }
} 