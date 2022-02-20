import React, { FC, useEffect, useState } from 'react'
import { Box, Text, Flex, Button } from '@chakra-ui/react'
import { mintAnimalTokenContract } from '../web3Config'
import AnimalCard from '../components/AnimalCard'

interface MainProps {
  account: string
}

const Main: FC<MainProps> = ({ account }) => {
  const [newAnimalType, setNewAnimalType] = useState<string>('')
  const handleMint = async () => {
    try {
      if (!account) return
      // mintAnimalTokenContract 주소로 가스비 보내짐
      const res = await mintAnimalTokenContract.methods.mintAnimalToken().send({ from: account })
      console.log('res', res)

      // animalType 값 구해서 image이름에 대입
      const mintCount: string = await mintAnimalTokenContract.methods.balanceOf(account).call()
      const tokenId: string = await mintAnimalTokenContract.methods.tokenOfOwnerByIndex(account, Number(mintCount) - 1).call()
      const animalType: string = await mintAnimalTokenContract.methods.animalTypeMap(tokenId).call()
      setNewAnimalType(animalType)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Flex w="full" h="full" justifyContent="center" alignItems="center" direction="column">
      {newAnimalType ? (
        <AnimalCard animalType={newAnimalType} />
      ) : (
        <Box>
          <Text>Let's mint animal card!!</Text>
        </Box>
      )}
      <Button size="sm" colorScheme={'pink'} mt={4} onClick={handleMint}>
        Mint
      </Button>
    </Flex>
  )
}

export default Main
