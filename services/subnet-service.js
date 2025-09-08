const TOTAL_IP_BITS = 32
const TOTAL_IP_BITS_WITH_DOTS = 35

function calculate_subnet_from_cicdr(cicdr) {
    // 1. split the cicdr to get the base IP and the sufix
    const base_ip = cicdr.split("/")[0]
    const sufix = cicdr.split("/")[1]

    console.log(`base_ip: ${base_ip}, sufix: ${sufix}`)

    // 2. calculate network mask from the sufix (For example: /24 means that first 24 bits are 1 and the rest are 0)
    const network_mask_obj = calculate_network_mask(sufix)
    const binary_network_mask = network_mask_obj.binary_network_mask
    const network_mask = network_mask_obj.network_mask
    const binary_reversed_network_mask = network_mask_obj.binary_reversed_network_mask
    const reversed_network_mask = network_mask_obj.reversed_network_mask

    console.log(`Binary network mask: ${binary_network_mask}`)
    console.log(`Network mask: ${network_mask}`)
    console.log(`Binary reversed network mask: ${binary_reversed_network_mask}`)
    console.log(`Reversed network mask: ${reversed_network_mask}`)

    // 3. calculate the network address with AND "&" of mask and base ip (The first IP of the range)
    const base_ip_array = base_ip.split(".")
    const network_mask_array = network_mask.split(".")
    
    let network_address_first_octet = base_ip_array[0]
    let network_address_second_octet = base_ip_array[1]
    let network_address_third_octet = base_ip_array[2]
    let network_address_fourth_octet = base_ip_array[3]

    let network_mask_first_octet = network_mask_array[0]
    let network_mask_second_octet = network_mask_array[1]
    let network_mask_third_octet = network_mask_array[2]
    let network_mask_fourth_octet = network_mask_array[3]

    if (network_mask_first_octet != "255") {
        network_address_first_octet = parseInt(network_address_first_octet, 10) & parseInt(first_octet, 2)
    }

    if (network_mask_second_octet != "255") {
        network_address_second_octet = parseInt(network_address_second_octet, 10) & parseInt(second_octet, 2)
    }

    if (network_mask_third_octet != "255") {
        network_address_third_octet = parseInt(network_address_third_octet, 10) & parseInt(third_octet, 2)
    }

    if (network_mask_fourth_octet != "255") {
        network_address_fourth_octet = parseInt(network_address_fourth_octet, 10) & parseInt(fourth_octet, 2)
    }
    const network_address = `${network_address_first_octet}.${network_address_second_octet}.${network_address_third_octet}.${network_address_fourth_octet}`
    console.log(`Network address: ${network_address}`)

    // 5. calculate the broadcast address with OR "|" of mask and base ip (The last IP of the range)
    let broadcast_address_first_octet = base_ip_array[0]
    let broadcast_address_second_octet = base_ip_array[1]
    let broadcast_address_third_octet = base_ip_array[2]
    let broadcast_address_fourth_octet = base_ip_array[3]
    if (network_mask_first_octet != "255") {
        broadcast_address_first_octet = parseInt(broadcast_address_first_octet, 10) | parseInt(reverse_first_octet, 2)
    }

    if (network_mask_second_octet != "255") {
        broadcast_address_second_octet = parseInt(broadcast_address_second_octet, 10) | parseInt(reverse_second_octet, 2)
    }

    if (network_mask_third_octet != "255") {
        broadcast_address_third_octet = parseInt(broadcast_address_third_octet, 10) | parseInt(reverse_third_octet, 2)
    }

    if (network_mask_fourth_octet != "255") {
        broadcast_address_fourth_octet = parseInt(broadcast_address_fourth_octet, 10) | parseInt(reverse_fourth_octet, 2)
    }
    const broadcast_address = `${broadcast_address_first_octet}.${broadcast_address_second_octet}.${broadcast_address_third_octet}.${broadcast_address_fourth_octet}`
    console.log(`Network address: ${network_address}`)


    // 6. calculate the first IP of the range, adding +1 to the network address already calculated
    let first_range_ip_first_octet = network_address_first_octet
    let first_range_ip_second_octet = network_address_second_octet
    let first_range_ip_third_octet = network_address_third_octet
    let first_range_ip_fourth_octet = network_address_fourth_octet

    if (network_address_fourth_octet < 255) {
        first_range_ip_fourth_octet = first_range_ip_fourth_octet + 1
    } else {
        if (network_address_third_octet < 255) {
            first_range_ip_third_octet = first_range_ip_third_octet + 1
            first_range_ip_fourth_octet = 0
        } else {
            if (network_address_second_octet < 255) {
                first_range_ip_second_octet = first_range_ip_second_octet + 1
                first_range_ip_third_octet = 0
                first_range_ip_fourth_octet = 0
            } else {
                if (network_address_first_octet < 255) {
                    first_range_ip_first_octet = first_range_ip_first_octet + 1
                    first_range_ip_second_octet = 0
                    first_range_ip_third_octet = 0
                    first_range_ip_fourth_octet = 0
                }
            }
        }
    }
    const first_range_ip = `${first_range_ip_first_octet}.${first_range_ip_second_octet}.${first_range_ip_third_octet}.${first_range_ip_fourth_octet}`

    // 7. calculate the last IP of the range, substracting -1 to the broadcast IP already calculated
    let last_range_ip_first_octet = broadcast_address_first_octet
    let last_range_ip_second_octet = broadcast_address_second_octet
    let last_range_ip_third_octet = broadcast_address_third_octet
    let last_range_ip_fourth_octet = broadcast_address_fourth_octet

    if (broadcast_address_fourth_octet > 0) {
        last_range_ip_fourth_octet = last_range_ip_fourth_octet - 1
    } else {
        if (broadcast_address_third_octet > 0) {
            last_range_ip_third_octet = last_range_ip_third_octet - 1
            last_range_ip_fourth_octet = 255
        } else {
            if (broadcast_address_second_octet > 0) {
                last_range_ip_second_octet = last_range_ip_second_octet - 1
                last_range_ip_third_octet = 255
                last_range_ip_fourth_octet = 255
            } else {
                if (broadcast_address_first_octet > 0) {
                    last_range_ip_first_octet = last_range_ip_first_octet - 1
                    last_range_ip_second_octet = 255
                    last_range_ip_third_octet = 255
                    last_range_ip_fourth_octet = 255
                }
            }
        }
    }
    const last_range_ip = `${last_range_ip_first_octet}.${last_range_ip_second_octet}.${last_range_ip_third_octet}.${last_range_ip_fourth_octet}`

    console.log("======== FINAL RESULTS ========")
    console.log(`Network address: ${network_address}`)
    console.log(`Broadcast address: ${broadcast_address}`)
    console.log(`First Range IP: ${first_range_ip}`)
    console.log(`Last range IP: ${last_range_ip}`)

    return {
        network_address: network_address,
        broadcast_address: broadcast_address,
        first_range_ip: first_range_ip,
        last_range_ip: last_range_ip
    }
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

    return {binary_network_mask: binary_network_mask, 
            network_mask: network_mask, 
            binary_reversed_network_mask: binary_reversed_network_mask,
            reversed_network_mask: reversed_network_mask
        }
}

function convert_binary_ip_to_decimal(ip) {
    const octet_1 = ip.substring(0, 8)
    const octet_2 = ip.substring(9, 17)
    const octet_3 = ip.substring(18, 26)
    const octet_4 = ip.substring(27, 35)

    const result = `${parseInt(octet_1, 2)}.${parseInt(octet_2, 2)}.${parseInt(octet_3, 2)}.${parseInt(octet_4, 2)}`
    console.log(`Converted Binary: ${ip} to Decimal: ${result}`)
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