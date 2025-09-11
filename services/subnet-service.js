const logger = require("../application/logger")

const TOTAL_IP_BITS = 32
const TOTAL_IP_BITS_WITH_DOTS = 35

function calculate_subnet_from_cicdr(cicdr) {
    // 1. split the cicdr to get the base IP and the sufix
    const base_ip = cicdr.split("/")[0]
    const sufix = cicdr.split("/")[1]

    logger.debug(`base_ip: ${base_ip}, sufix: ${sufix}`)

    // 2. calculate network mask from the sufix (For example: /24 means that first 24 bits are 1 and the rest are 0)
    const network_mask_obj = calculate_network_mask(sufix)
    logger.debug(`Network Mask: ${JSON.stringify(network_mask_obj)}`)

    const network_mask = network_mask_obj.network_mask
    const reversed_network_mask = network_mask_obj.reversed_network_mask    

    // 3. calculate the network address with AND "&" of base_ip AND network_mask (The first IP of the range)
    const network_address = calculate_network_address(base_ip, network_mask)
    logger.debug(`Network Address: ${network_address}`)

    // 4. calculate the broadcast address with OR "|" of base_ip OR reversed_network_mask (The last IP of the range)
    const broadcast_address = calculate_broadcast_address(base_ip, network_address, reversed_network_mask)
    logger.debug(`Broadcast Address: ${broadcast_address}`)


    // 5. calculate the first IP of the range, adding +1 to the network address already calculated
    const first_ip = parseInt(sufix, 10) === 32 || parseInt(sufix, 10) === 31 ? network_address : calculate_first_ip(network_address)
    logger.debug(`First IP: ${first_ip}`)

    // 6. calculate the last IP of the range, substracting -1 to the broadcast IP already calculated
    const last_ip = parseInt(sufix, 10) === 32 || parseInt(sufix, 10) === 31 ? broadcast_address : calculate_last_ip(broadcast_address)
    logger.debug(`Last IP: ${last_ip}`)

    return {
        network_address: network_address,
        broadcast_address: broadcast_address,
        first_ip: first_ip,
        last_ip: last_ip
    }
}


function calculate_first_ip(network_address) {
    const network_address_array = network_address.split(".")

    let octet_1 = network_address_array[0], octet_2 = network_address_array[1], octet_3 = network_address_array[2], octet_4 = network_address_array[3]

    if (parseInt(network_address_array[3], 10) < 255) {
        octet_4 = parseInt(network_address_array[3], 10) + 1
        return `${octet_1}.${octet_2}.${octet_3}.${octet_4}`
    } 
    if (parseInt(network_address_array[2], 10) < 255) {
        octet_3 = parseInt(network_address_array[2], 10) + 1
        octet_4 = 0
        return `${octet_1}.${octet_2}.${octet_3}.${octet_4}`
    }
    if (parseInt(network_address_array[1], 10) < 255) {
        octet_2 = parseInt(network_address_array[1], 10) + 1
        octet_3 = 0
        octet_4 = 0
        return `${octet_1}.${octet_2}.${octet_3}.${octet_4}`
    }
    if (parseInt(network_address_array[0], 10) < 255) {
        octet_1 = parseInt(network_address_array[0], 10) + 1
        octet_2 = 0
        octet_3 = 0
        octet_4 = 0
        return `${octet_1}.${octet_2}.${octet_3}.${octet_4}`
    }
}

function calculate_last_ip(broadcast_ip) {
    const broadcast_ip_array = broadcast_ip.split(".")

    let octet_1 = broadcast_ip_array[0], octet_2 = broadcast_ip_array[1], octet_3 = broadcast_ip_array[2], octet_4 = broadcast_ip_array[3]

    if (parseInt(broadcast_ip_array[3], 10) > 0) {
        octet_4 = parseInt(broadcast_ip_array[3], 10) - 1
        return `${octet_1}.${octet_2}.${octet_3}.${octet_4}`
    }
    if (parseInt(broadcast_ip_array[2], 10) > 0) {
        octet_3 = parseInt(broadcast_ip_array[2], 10) - 1
        octet_4 = 255
        return `${octet_1}.${octet_2}.${octet_3}.${octet_4}`
    }
    if (parseInt(broadcast_ip_array[1], 10) > 0) {
        octet_2 = parseInt(broadcast_ip_array[1], 10) - 1
        octet_3 = 255
        octet_4 = 255
        return `${octet_1}.${octet_2}.${octet_3}.${octet_4}`
    }
    if (parseInt(broadcast_ip_array[0], 10) > 0) {
        octet_1 = parseInt(broadcast_ip_array[0], 10) - 1
        octet_2 = 255
        octet_3 = 255
        octet_4 = 255
        return `${octet_1}.${octet_2}.${octet_3}.${octet_4}`
    }
}


// calculate the broadcast address with OR "|" of base_ip OR reversed_network_mask (The last IP of the range)
function calculate_broadcast_address(base_ip, network_mask, reversed_network_mask) {
    const base_ip_array = base_ip.split(".")
    const network_mask_array = network_mask.split(".")
    const reversed_network_mask_array = reversed_network_mask.split(".")

    let octet_1 = base_ip_array[0], octet_2 = base_ip_array[1], octet_3 = base_ip_array[2], octet_4 = base_ip_array[3]

    if (network_mask_array[0] != "255") {
        octet_1 = parseInt(octet_1, 10) | parseInt(reversed_network_mask_array[0], 10)
    }

    if (network_mask_array[1] != "255") {
        octet_2 = parseInt(octet_2, 10) | parseInt(reversed_network_mask_array[1], 10)
    }

    if (network_mask_array[2] != "255") {
        octet_3 = parseInt(octet_3, 10) | parseInt(reversed_network_mask_array[2], 10)
    }

    if (network_mask_array[3] != "255") {
        octet_4 = parseInt(octet_4, 10) | parseInt(reversed_network_mask_array[3], 10)
    }
    return `${octet_1}.${octet_2}.${octet_3}.${octet_4}`
}


// calculate the network address with AND "&" of base_ip AND network_mask (The first IP of the range)
function calculate_network_address(base_ip, network_mask) {
    const base_ip_array = base_ip.split(".")
    const network_mask_array = network_mask.split(".")

    let octet_1 = base_ip_array[0], octet_2 = base_ip_array[1], octet_3 = base_ip_array[2], octet_4 = base_ip_array[3]

    if (network_mask_array[0] != "255") {
        octet_1 = parseInt(base_ip_array[0], 10) & parseInt(network_mask_array[0], 10)
    }

    if (network_mask_array[1] != "255") {
        octet_2 = parseInt(base_ip_array[1], 10) & parseInt(network_mask_array[1], 10)
    }

    if (network_mask_array[2] != "255") {
        octet_3 = parseInt(base_ip_array[2], 10) & parseInt(network_mask_array[2], 10)
    }

    if (network_mask_array[3] != "255") {
        octet_4 = parseInt(base_ip_array[3], 10) & parseInt(network_mask_array[3], 10)
    }
    return `${octet_1}.${octet_2}.${octet_3}.${octet_4}`
}


function calculate_network_mask(sufix) {
    let binary_network_mask = ""

    // fill all the bits from the beginning with "1", until complete all the sufix
    for (let i = sufix; i > 0; i--) {
        binary_network_mask = `${binary_network_mask}1`
    }

    // fill the rest of bits with "0"
    for (let i = TOTAL_IP_BITS - sufix; i > 0; i--) {
        binary_network_mask = `${binary_network_mask}0`
    }

    const octet_1 = binary_network_mask.substring(0, 8)
    const octet_2 = binary_network_mask.substring(8, 16)
    const octet_3 = binary_network_mask.substring(16, 24)
    const octet_4 = binary_network_mask.substring(24, 32)

    binary_network_mask = `${octet_1}.${octet_2}.${octet_3}.${octet_4}`
    const network_mask = `${parseInt(octet_1, 2)}.${parseInt(octet_2, 2)}.${parseInt(octet_3, 2)}.${parseInt(octet_4, 2)}`
    const binary_reversed_network_mask = reverse_binary_network_mask(binary_network_mask)
    const reversed_network_mask = convert_binary_ip_to_decimal(binary_reversed_network_mask)

    return {network_mask: network_mask, 
            reversed_network_mask: reversed_network_mask
        }
}

function convert_binary_ip_to_decimal(ip) {
    const octet_1 = ip.substring(0, 8)
    const octet_2 = ip.substring(9, 17)
    const octet_3 = ip.substring(18, 26)
    const octet_4 = ip.substring(27, 35)

    const result = `${parseInt(octet_1, 2)}.${parseInt(octet_2, 2)}.${parseInt(octet_3, 2)}.${parseInt(octet_4, 2)}`
    logger.debug(`Converted Binary: ${ip} to Decimal: ${result}`)
    return result
}

function reverse_binary_network_mask(binary_network_mask) {
    let binary_reverse_network_mask = ""

    for (let i = 0; i < TOTAL_IP_BITS_WITH_DOTS; i++) {
        if (binary_network_mask[i] === "1") {
            binary_reverse_network_mask = `${binary_reverse_network_mask}0`
        } else if (binary_network_mask[i] === "0") {
            binary_reverse_network_mask = `${binary_reverse_network_mask}1`
        } else {
            binary_reverse_network_mask = `${binary_reverse_network_mask}.`
        }
    }
    return binary_reverse_network_mask
}

module.exports = {calculate_subnet_from_cicdr}